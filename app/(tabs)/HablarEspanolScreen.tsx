import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestMicrophonePermission } from '../../utils/requestMicrophonePermission';
import { GUIDED_DIALOGS, GRAMMAR_DIALOGS, type GuidedDialog } from '../../data/guidedDialogs';
import { useUser } from '../../contexts/UserContext';

type DialogContext = {
  name: string | null;
  country: string | null;
  dialogIndex: number;
};

type WebMessage = {
  type: string;
  payload?: any;
};

const HTML_REVISION = Date.now();

const encodeTextToBase64 = (text: string) => Buffer.from(text, 'utf-8').toString('base64');
const encodeForScript = (value: unknown) => encodeTextToBase64(JSON.stringify(value));

const buildDialogHtml = (dialogs: GuidedDialog[], context: DialogContext) => {
  const safeDialogs = encodeForScript(dialogs);
  const safeContext = encodeForScript(context);
  const totalDialogs = dialogs.length;

  const rawHtml = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; min-height: 100vh; }
      .container { max-width: 420px; margin: 0 auto; padding: 16px; }
      .header { text-align: center; padding: 12px 0; }
      .header h1 { margin: 0; font-size: 20px; color: #fbbf24; }
      .progress { font-size: 12px; color: #94a3b8; margin-top: 4px; }

      .bot-container { display: flex; flex-direction: column; align-items: center; margin: 16px 0; }
      .bot-face { width: 120px; height: 120px; background: linear-gradient(145deg, #3b82f6, #1d4ed8); border-radius: 50%; position: relative; box-shadow: 0 8px 32px rgba(59,130,246,0.4); }
      .bot-eyes { position: absolute; top: 35px; left: 50%; transform: translateX(-50%); display: flex; gap: 24px; }
      .bot-eye { width: 16px; height: 16px; background: #fff; border-radius: 50%; position: relative; }
      .bot-eye::after { content: ''; position: absolute; width: 8px; height: 8px; background: #1e293b; border-radius: 50%; top: 4px; left: 4px; }
      .bot-mouth { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 40px; height: 8px; background: #fff; border-radius: 4px; transition: all 0.1s ease; }
      .bot-mouth.speaking { animation: speak 0.15s infinite alternate; }
      @keyframes speak { 0% { height: 8px; width: 40px; } 100% { height: 20px; width: 36px; border-radius: 50%; } }
      .bot-status { margin-top: 8px; font-size: 13px; color: #60a5fa; }
      .feedback-face { font-size: 48px; margin: 8px 0; }

      .card { background: rgba(30,41,59,0.9); border: 1px solid rgba(148,163,184,0.2); border-radius: 16px; padding: 16px; margin-bottom: 12px; }
      .card-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 8px; }
      .arabic { display: block; font-size: 12px; color: #cbd5f5; direction: rtl; text-align: right; margin-top: 4px; }
      .progress .arabic { margin-top: 6px; font-size: 12px; color: #cbd5f5; }
      .bot-text { font-size: 16px; color: #e2e8f0; line-height: 1.5; }
      .bot-text.arabic { margin-top: 6px; font-size: 14px; color: #cbd5f5; direction: rtl; text-align: right; }
      .bot-line { margin-top: 6px; }
      .bot-line:first-child { margin-top: 0; }
      .bot-line.example { color: #fbbf24; font-weight: 600; }
      .grammar-hl { color: #fecaca; background: rgba(220, 38, 38, 0.35); border-radius: 4px; padding: 0 2px; font-weight: 800; }
      .user-prompt { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 12px; margin-top: 12px; }
      .user-prompt-title { font-size: 11px; color: #fbbf24; text-transform: uppercase; margin-bottom: 4px; }
      .user-prompt-text { font-size: 15px; color: #fef3c7; font-weight: 600; }
      .user-prompt-text.arabic { margin-top: 6px; font-size: 14px; color: #fde68a; font-weight: 500; }
      .user-prompt-pron-label { font-size: 10px; color: #fcd34d; text-transform: uppercase; margin-top: 8px; display: none; }
      .user-prompt-pron { margin-top: 4px; font-size: 14px; color: #fde68a; direction: rtl; text-align: right; display: none; }
      .hint-box { background: rgba(139,92,246,0.15); border: 1px dashed rgba(139,92,246,0.5); border-radius: 10px; padding: 10px; margin-top: 10px; font-size: 13px; color: #c4b5fd; display: none; }

      .history { max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
      .bubble { padding: 10px 14px; border-radius: 14px; font-size: 14px; max-width: 85%; }
      .bubble.bot { background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); align-self: flex-start; }
      .bubble.user { background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.4); align-self: flex-end; }

      .controls { display: flex; gap: 10px; flex-wrap: wrap; }
      #voiceControls { display: flex; }
      .btn { flex: 1; min-width: 100px; padding: 14px 16px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; text-transform: uppercase; }
      .btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; }
      .btn-secondary { background: rgba(148,163,184,0.2); color: #e2e8f0; border: 1px solid rgba(148,163,184,0.3); }
      .btn[disabled] { opacity: 0.45; cursor: default; }
      .btn-next { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #1a1a2e; width: 100%; margin-top: 10px; display: none; }
      .btn-next.active { display: block; }
      .btn-reset { width: 100%; margin-top: 10px; }

      .status { font-size: 12px; color: #60a5fa; margin-top: 8px; text-align: center; }
      .warning { font-size: 12px; color: #f87171; margin-top: 6px; text-align: center; }
      .final-msg { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); border-radius: 12px; padding: 12px; margin-top: 12px; color: #86efac; font-size: 14px; display: none; }
      .final-msg.active { display: block; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🗣️ Vamos a hablar español<span class="arabic">🗣️ هيا نتحدث الإسبانية</span></h1>
        <div class="progress">
          <span id="dialogProgress">Diálogo 1 de ${totalDialogs}</span> · <span id="stepProgress">Frase 1</span>
          <span class="arabic" id="progressAr">الحوار 1 من ${totalDialogs} · الجملة 1</span>
        </div>
      </div>

      <div class="bot-container">
        <div class="bot-face">
          <div class="bot-eyes">
            <div class="bot-eye"></div>
            <div class="bot-eye"></div>
          </div>
          <div class="bot-mouth" id="botMouth"></div>
        </div>
        <div class="bot-status" id="botStatus">Listo para empezar</div>
        <div class="feedback-face" id="feedbackFace"></div>
      </div>

      <div class="card">
        <div class="card-title">Diálogo actual<span class="arabic">الحوار الحالي</span></div>
        <div class="bot-text" id="botPrompt">Preparando...</div>
        <div class="bot-text arabic" id="botPromptAr" style="display:none;"></div>
        <div class="user-prompt">
          <div class="user-prompt-title">📢 Di esta frase:<span class="arabic">📢 قل هذه العبارة</span></div>
          <div class="user-prompt-text" id="userPhrase">...</div>
          <div class="user-prompt-text arabic" id="userPhraseAr" style="display:none;"></div>
          <div class="user-prompt-pron-label" id="userPhrasePronLabel">🔤 Pronunciación en letras árabes<span class="arabic">🔤 النطق بحروف عربية</span></div>
          <div class="user-prompt-pron" id="userPhrasePronAr"></div>
        </div>
        <div class="hint-box" id="hint"></div>
        <div class="hint-box" id="resultHint"></div>
        <div class="final-msg" id="finalMessage"></div>
      </div>

      <div class="card">
        <div class="controls">
          <button
            class="btn btn-primary"
            id="startDialog"
            type="button"
            style="width:100%;"
            onclick="try { document.getElementById('status').textContent='Click OK'; if (window.__startDialog) { document.getElementById('status').textContent='Iniciando...'; window.__startDialog(); } else { document.getElementById('status').textContent='Sin handler (scripts=' + (document.scripts ? document.scripts.length : 'n/a') + ')'; } } catch (e) { document.getElementById('warning').textContent='Start error: ' + (e && e.message ? e.message : e); }"
          >▶️ Empezar diálogo<span class="arabic">ابدأ الحوار</span></button>
        </div>
        <div class="controls" id="voiceControls">
          <button class="btn btn-primary" id="start">🎤 Responder<span class="arabic">🎤 أجب</span></button>
          <button class="btn btn-secondary" id="stop">⏹️ Detener<span class="arabic">⏹️ إيقاف</span></button>
        </div>
        <button class="btn btn-next" id="nextDialog">➡️ Siguiente diálogo<span class="arabic">➡️ الحوار التالي</span></button>
        <button class="btn btn-secondary btn-reset" id="resetDialog">🔁 Reiniciar desde diálogo 1<span class="arabic">🔁 إعادة من الحوار 1</span></button>
        <div class="status" id="status">Esperando JS...</div>
        <div class="warning" id="warning"></div>
      </div>
    </div>

    <script>
      window.__startDialog = function() {
        var statusEl = document.getElementById('status');
        if (statusEl) statusEl.textContent = 'Handler base: script sin init';
      };

      window.onerror = function(message, source, line, col) {
        var warningEl = document.getElementById('warning');
        if (warningEl) warningEl.textContent = 'Error JS: ' + message + ' (' + line + ':' + col + ')';
      };

      var bootEl = document.getElementById('status');
      if (bootEl) bootEl.textContent = 'Bootstrap OK';

    </script>

    <script>

      try {
      (function(){
        function decodePayload(base64) {
          try {
            var binary = window.atob(base64);
            try {
              return JSON.parse(decodeURIComponent(escape(binary)));
            } catch (inner) {
              return JSON.parse(binary);
            }
          } catch (error) {
            console.log('decode error', error);
            return [];
          }
        }

        var dialogs = decodePayload('${safeDialogs}');
        var initialContext = decodePayload('${safeContext}');
        var RN = window.ReactNativeWebView;

        var state = {
          dialogIndex: Math.min(initialContext.dialogIndex || 0, dialogs.length - 1),
          stepIndex: 0,
          name: initialContext.name || null,
          country: initialContext.country || null,
          awaitingNextDialog: false,
          completedAll: false,
          lastQuestionKey: null,
          hasInteracted: false,
          dialogStarted: false,
          renderToken: 0
        };

        var refs = {};
        var rec = null;
        var lastTranscript = '';
        var lastHandled = '';
        var translationCache = {};
        var translationQueue = {};

        function setStatus(text) {
          if (refs.status) refs.status.textContent = text;
        }

        function setWarning(text) {
          if (refs.warning) refs.warning.textContent = text || '';
        }

        function send(type, payload) {
          try {
            if (RN && RN.postMessage) {
              RN.postMessage(JSON.stringify({ type: type, payload: payload }));
            }
          } catch (error) {
            console.log('send error', error);
          }
        }

        function speakBotSequence(texts) {
          if (!texts || !texts.length) return;
          if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
            send('speak', { texts: texts });
            if (refs.botMouth) refs.botMouth.classList.add('speaking');
            if (refs.botStatus) refs.botStatus.textContent = 'Hablando...';
            var totalDelay = 0;
            for (var i = 0; i < texts.length; i++) {
              totalDelay += estimateSpeakDelay(texts[i]);
            }
            setTimeout(function() {
              if (refs.botMouth) refs.botMouth.classList.remove('speaking');
              if (refs.botStatus) refs.botStatus.textContent = 'Esperando tu respuesta';
            }, totalDelay);
            return;
          }
          try {
            window.speechSynthesis.cancel();
            for (var j = 0; j < texts.length; j++) {
              var utterance = new SpeechSynthesisUtterance(texts[j]);
              utterance.lang = 'es-ES';
              utterance.rate = 0.95;
              if (j === 0) {
                utterance.onstart = function() {
                  if (refs.botMouth) refs.botMouth.classList.add('speaking');
                  if (refs.botStatus) refs.botStatus.textContent = 'Hablando...';
                };
              }
              if (j === texts.length - 1) {
                utterance.onend = function() {
                  if (refs.botMouth) refs.botMouth.classList.remove('speaking');
                  if (refs.botStatus) refs.botStatus.textContent = 'Esperando tu respuesta';
                };
              }
              window.speechSynthesis.speak(utterance);
            }
          } catch (error) {
            console.log('speech error', error);
          }
        }

        function estimateSpeakDelay(text) {
          var length = (text || '').length;
          var delay = length * 120 + 300;
          if (delay < 1500) delay = 1500;
          if (delay > 6000) delay = 6000;
          return delay;
        }

        function normalize(text) {
          return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\\s]/g, ' ')
            .replace(/\\s+/g, ' ')
            .trim();
        }

        function toArabicPronunciation(text) {
          var value = (text || '').toLowerCase();
          try {
            value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          } catch (e) {}
          value = value
            .replace(/¿|¡/g, '')
            .replace(/ch/g, '§')
            .replace(/ll/g, '¤')
            .replace(/rr/g, '¥')
            .replace(/qu/g, 'k')
            .replace(/gue/g, 'ge')
            .replace(/gui/g, 'gi')
            .replace(/ge/g, 'xe')
            .replace(/gi/g, 'xi')
            .replace(/j/g, 'x')
            .replace(/ñ/g, 'ny')
            .replace(/ce/g, 'se')
            .replace(/ci/g, 'si')
            .replace(/z/g, 's')
            .replace(/v/g, 'b')
            .replace(/h/g, '');

          var map = {
            a: 'ا', b: 'ب', c: 'ك', d: 'د', e: 'ي', f: 'ف', g: 'غ', i: 'ي', k: 'ك', l: 'ل',
            m: 'م', n: 'ن', o: 'و', p: 'ب', q: 'ك', r: 'ر', s: 'س', t: 'ت', u: 'و', w: 'و',
            x: 'خ', y: 'ي'
          };

          var out = '';
          for (var i = 0; i < value.length; i++) {
            var ch = value.charAt(i);
            if (ch === '§') { out += 'تش'; continue; }
            if (ch === '¤') { out += 'ي'; continue; }
            if (ch === '¥') { out += 'ر'; continue; }
            if (ch === ' ') { out += ' '; continue; }
            if (ch === ',') { out += '،'; continue; }
            if (ch === '?') { out += '؟'; continue; }
            if (ch === ';' || ch === ':' || ch === '.' || ch === '!' || ch === '(' || ch === ')' || ch === '-' || ch === '/' || ch === '"') {
              out += ch;
              continue;
            }
            out += map[ch] || ch;
          }
          return out.replace(/\\s+/g, ' ').trim();
        }

        function decodeHtmlEntities(text) {
          return (text || '')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
        }

        function protectTemplateTokens(text) {
          return (text || '')
            .replace(/{{name}}/gi, '__NAME__')
            .replace(/{{country}}/gi, '__COUNTRY__');
        }

        function restoreTemplateTokens(text) {
          return (text || '')
            .replace(/__NAME__/g, '{{name}}')
            .replace(/__COUNTRY__/g, '{{country}}');
        }

        function parseGoogleTranslation(data) {
          if (!Array.isArray(data) || !Array.isArray(data[0])) return '';
          var parts = data[0];
          var translated = '';
          for (var i = 0; i < parts.length; i++) {
            if (Array.isArray(parts[i]) && typeof parts[i][0] === 'string') {
              translated += parts[i][0];
            }
          }
          return decodeHtmlEntities(translated);
        }

        function flushTranslationQueue(source, value) {
          var queue = translationQueue[source] || [];
          delete translationQueue[source];
          for (var i = 0; i < queue.length; i++) {
            try {
              queue[i](value);
            } catch (e) {}
          }
        }

        function fetchArabicTranslation(text, onDone) {
          var source = (text || '').trim();
          if (!source) {
            onDone('');
            return;
          }
          if (Object.prototype.hasOwnProperty.call(translationCache, source)) {
            onDone(translationCache[source]);
            return;
          }
          if (translationQueue[source]) {
            translationQueue[source].push(onDone);
            return;
          }

          translationQueue[source] = [onDone];
          if (typeof fetch !== 'function') {
            translationCache[source] = '';
            flushTranslationQueue(source, '');
            return;
          }

          var protectedText = protectTemplateTokens(source);
          var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=ar&dt=t&q=' + encodeURIComponent(protectedText);
          fetch(url)
            .then(function(response) { return response.json(); })
            .then(function(data) {
              var translated = restoreTemplateTokens(parseGoogleTranslation(data));
              translationCache[source] = translated || '';
              flushTranslationQueue(source, translationCache[source]);
            })
            .catch(function() {
              translationCache[source] = '';
              flushTranslationQueue(source, '');
            });
        }

        function matchesInOrder(answer, expectedList) {
          var normalized = normalize(answer);
          var cursor = 0;
          for (var i = 0; i < expectedList.length; i++) {
            var token = normalize(expectedList[i]);
            if (!token) continue;
            var idx = normalized.indexOf(token, cursor);
            if (idx === -1) return false;
            cursor = idx + token.length;
          }
          return true;
        }

        function extractName(answer) {
          var match = answer.match(/(?:me llamo|mi nombre es|soy)\\s+([^\\n\\r.,!?]+)/i);
          if (!match) return null;
          var value = match[1].trim();
          if (!value) return null;
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        function extractCountry(answer) {
          var match = answer.match(/(?:soy de|vengo de|de)\\s+([^\\n\\r.,!?]+)/i);
          if (!match) return null;
          var value = match[1].replace(/^de\\s+/i, '').trim();
          if (!value) return null;
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        function formatWithContext(text) {
          if (!text) return '';
          return text
            .replace(/{{name}}/gi, state.name || 'amigo')
            .replace(/{{country}}/gi, state.country || 'tu país');
        }

        function insertNewlineBeforeMarker(text, marker) {
          if (!text || !marker) return text || '';
          var result = '';
          var cursor = 0;
          while (true) {
            var idx = text.indexOf(marker, cursor);
            if (idx === -1) {
              result += text.slice(cursor);
              break;
            }
            if (idx > 0) {
              result += text.slice(cursor, idx).trimEnd() + '\\n' + marker;
            } else {
              result += marker;
            }
            cursor = idx + marker.length;
          }
          return result;
        }

        function formatPromptLines(text, isArabic) {
          if (!text) return [];
          var formatted = insertNewlineBeforeMarker(text, 'Ejemplo ');
          formatted = insertNewlineBeforeMarker(formatted, 'المثال ');
          var rawLines = formatted.split('\\n');
          var lines = [];
          for (var i = 0; i < rawLines.length; i++) {
            var line = rawLines[i].trim();
            if (line) lines.push(line);
          }
          return lines;
        }

        function escapeHtml(text) {
          return (text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }

        function escapeRegExp(text) {
          var value = text || '';
          var slash = String.fromCharCode(92);
          var specials = [slash, '.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '/'];
          for (var i = 0; i < specials.length; i++) {
            var token = specials[i];
            value = value.split(token).join(slash + token);
          }
          return value;
        }

        function buildHighlightRegex(keywords) {
          if (!keywords || !keywords.length) return null;
          var seen = {};
          var normalized = [];
          for (var i = 0; i < keywords.length; i++) {
            var kw = (keywords[i] || '').trim();
            if (!kw || kw.length < 2) continue;
            var key = kw.toLowerCase();
            if (seen[key]) continue;
            seen[key] = true;
            normalized.push(kw);
          }
          if (!normalized.length) return null;
          normalized.sort(function(a, b) { return b.length - a.length; });
          var escaped = [];
          for (var j = 0; j < normalized.length; j++) {
            escaped.push(escapeRegExp(escapeHtml(normalized[j])));
          }
          try {
            return new RegExp('(' + escaped.join('|') + ')', 'gi');
          } catch (e) {
            return null;
          }
        }

        function setHighlightedText(element, text, isArabic, keywords) {
          if (!element) return;
          var content = text || '';
          if (isArabic || !keywords || !keywords.length) {
            element.textContent = content;
            return;
          }
          var safe = escapeHtml(content);
          var regex = buildHighlightRegex(keywords);
          if (!regex) {
            element.textContent = content;
            return;
          }
          element.innerHTML = safe.replace(regex, '<span class="grammar-hl">$1</span>');
        }

        var grammarHighlightByDialog = {
          'dialogo-11': ['yo', 'tú', 'él', 'ella', 'usted', 'nosotros', 'vosotros', 'ellos', 'ellas', 'ustedes'],
          'dialogo-12': ['sujeto', 'verbo', 'complemento', 'yo estudio español', 'yo vivo en madrid'],
          'dialogo-13': ['ser', 'soy', 'eres', 'es', 'somos', 'sois', 'son'],
          'dialogo-14': ['estar', 'estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
          'dialogo-15': ['artículos', 'masculino', 'femenino', 'la casa', 'el libro'],
          'dialogo-16': ['plural', 'los libros', 'las casas', 'masculino', 'femenino'],
          'dialogo-17': ['concordar', 'adjetivo', 'sustantivo', 'mis amigos son simpáticos', 'mis amigas son simpáticas'],
          'dialogo-18': ['posesivos', 'mi', 'tu', 'su', 'nuestro', 'mi casa es pequeña'],
          'dialogo-19': ['preposiciones', '“en”', '“a”', '“de”', '“con”', 'voy a la escuela con mi hermana'],
          'dialogo-20': ['presente', 'yo trabajo', 'ella come', 'conjugación'],
          'dialogo-21': ['gustar', 'me gusta', 'me gustan'],
          'dialogo-22': ['negar', '“no”', 'no trabajo hoy', 'no tengo dinero'],
          'dialogo-23': ['¿qué?', '¿dónde?', '¿cuándo?', '¿dónde vives?', '¿qué quieres?'],
          'dialogo-24': ['aquí', 'ahí', 'allí', 'cerca', 'lejos'],
          'dialogo-25': ['hoy', 'ayer', 'mañana', 'ahora', 'después'],
          'dialogo-26': ['siempre', 'a veces', 'nunca'],
          'dialogo-27': ['ir a + infinitivo', 'voy a', 'mañana voy a trabajar'],
          'dialogo-28': ['he', 'has', 'ha', 'hemos', 'habéis', 'han', 'he comido'],
          'dialogo-29': ['pretérito indefinido', 'ayer estudié', 'el lunes trabajé'],
          'dialogo-30': ['imperativo', 'ven', 'mira', 'escucha'],
          'dialogo-31': ['más ... que', 'menos ... que', 'tan ... como'],
          'dialogo-32': ['por', 'para', 'estudio para trabajar', 'gracias por tu ayuda'],
          'dialogo-33': ['hay', 'hay que', 'hay agua en la mesa', 'hay que estudiar hoy'],
          'dialogo-34': ['subjuntivo', 'quiero que', 'necesito que', 'es importante que', 'vengas', 'estudies'],
          'dialogo-35': ['condicional', 'hablaría', 'viviría'],
          'dialogo-36': ['objeto directo', 'objeto indirecto', 'lo', 'la', 'los', 'las', 'me', 'te', 'le', 'nos', 'les'],
          'dialogo-37': ['reflexivos', 'me', 'te', 'se', 'nos', 'os', 'me levanto', 'se llama'],
          'dialogo-38': ['condicional compuesto', 'habría', 'habrías', 'habríamos', 'habrían'],
          'dialogo-39': ['imperfecto', 'indefinido', 'trabajaba', 'trabajé', 'antes', 'ayer'],
          'dialogo-40': ['que', 'quien', 'donde', 'la mujer que vive aquí', 'el lugar donde trabajo'],
          'dialogo-41': ['tener que', 'acabar de', 'seguir', 'gerundio', 'tengo que estudiar', 'acabo de llegar', 'sigo trabajando'],
          'dialogo-42': ['irregulares', 'tengo', 'vengo', 'puedo', 'quiero', 'viene', 'hago', 'queremos', 'podemos'],
          'dialogo-43': ['cortesía', 'quería', 'podía', 'por favor', 'pedir', 'ayudarme'],
          'dialogo-44': ['pronombres combinados', 'me lo', 'te la', 'se lo', 'nos la', 'indirecto', 'directo'],
          'dialogo-45': ['se impersonal', 'pasiva refleja', 'se habla', 'se venden', 'no se fuma', 'se organizan'],
          'dialogo-46': ['futuro simple', 'estudiaré', 'trabajaremos', 'vendrás', 'aprobarás'],
          'dialogo-47': ['pluscuamperfecto', 'había', 'habías', 'habíamos', 'hablado', 'terminado'],
          'dialogo-48': ['si', 'tuviera', 'estudiaría', 'encontrara', 'alquilaría', 'pudiéramos', 'viajaríamos'],
          'dialogo-49': ['estilo indirecto', 'dice que', 'pregunta si', 'comentan que', 'expliqué que'],
          'dialogo-50': ['conectores', 'porque', 'pero', 'sin embargo', 'primero', 'luego', 'después']
        };

        function parseDialogLevel(dialogId) {
          var match = (dialogId || '').match(/^dialogo-(\d+)$/);
          if (!match) return 0;
          return parseInt(match[1], 10) || 0;
        }

        function getGrammarHighlightKeywords(dialog) {
          if (!dialog || !dialog.id) return [];
          var level = parseDialogLevel(dialog.id);
          if (level < 11 || level > 50) return [];
          return grammarHighlightByDialog[dialog.id] || [];
        }

        function renderPromptLines(element, text, isArabic, highlightKeywords) {
          if (!element) return;
          element.innerHTML = '';
          if (!text) {
            element.style.display = 'none';
            return;
          }
          element.style.display = 'block';
          var lines = formatPromptLines(text, isArabic);
          if (!lines.length) {
            setHighlightedText(element, text, isArabic, highlightKeywords);
            return;
          }
          var examplePrefix = isArabic ? 'المثال' : 'Ejemplo';
          for (var i = 0; i < lines.length; i++) {
            var lineEl = document.createElement('div');
            lineEl.className = 'bot-line';
            if (lines[i].indexOf(examplePrefix) === 0) {
              lineEl.className += ' example';
            }
            setHighlightedText(lineEl, lines[i], isArabic, highlightKeywords);
            element.appendChild(lineEl);
          }
        }

        function currentDialog() {
          return dialogs[state.dialogIndex];
        }

        function currentStep() {
          var dialog = currentDialog();
          if (!dialog) return null;
          return dialog.steps[state.stepIndex] || null;
        }

        function speakBot(text) {
          if (!text) return;
          if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
            send('speak', { text: text });
            if (refs.botMouth) refs.botMouth.classList.add('speaking');
            if (refs.botStatus) refs.botStatus.textContent = 'Hablando...';
            setTimeout(function() {
              if (refs.botMouth) refs.botMouth.classList.remove('speaking');
              if (refs.botStatus) refs.botStatus.textContent = 'Esperando tu respuesta';
            }, 1200);
            return;
          }
          try {
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            utterance.rate = 0.95;
            utterance.onstart = function() {
              if (refs.botMouth) refs.botMouth.classList.add('speaking');
              if (refs.botStatus) refs.botStatus.textContent = 'Hablando...';
            };
            utterance.onend = function() {
              if (refs.botMouth) refs.botMouth.classList.remove('speaking');
              if (refs.botStatus) refs.botStatus.textContent = 'Esperando tu respuesta';
            };
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.log('speech error', error);
          }
        }

        function showFeedback(correct) {
          if (!refs.feedbackFace) return;
          refs.feedbackFace.textContent = correct ? '😊' : '😕';
          setTimeout(function() {
            if (refs.feedbackFace) refs.feedbackFace.textContent = '';
          }, 2000);
        }

        function pushHistory(speaker, text) {
          if (!text || !refs.history) return;
          var div = document.createElement('div');
          div.className = 'bubble ' + (speaker === 'bot' ? 'bot' : 'user');
          div.textContent = text;
          refs.history.appendChild(div);
          refs.history.scrollTop = refs.history.scrollHeight;
        }

        function initRecognition() {
          var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SpeechRecognition) {
            setWarning('Este dispositivo no soporta reconocimiento de voz.');
            return;
          }
          rec = new SpeechRecognition();
          rec.lang = 'es-ES';
          rec.interimResults = true;
          rec.continuous = false;
          rec.maxAlternatives = 1;
          rec.onstart = function() { setStatus('🎤 Grabando...'); };
          rec.onerror = function(event) {
            setWarning('Error de micrófono: ' + (event.error || 'desconocido'));
          };
          rec.onend = function() {
            setStatus('Micrófono detenido');
            if (lastTranscript && lastTranscript !== lastHandled) {
              lastHandled = lastTranscript;
              handleAnswer(lastTranscript);
            }
          };
          rec.onresult = function(event) {
            var transcript = '';
            var isFinal = false;
            for (var i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript + ' ';
              if (event.results[i].isFinal) {
                isFinal = true;
              }
            }
            lastTranscript = transcript.trim();
            if (isFinal && lastTranscript) {
              lastHandled = lastTranscript;
              handleAnswer(lastTranscript);
            }
          };
        }

        function renderStep(skipSpeak) {
          var speakText = null;
          var dialog = currentDialog();
          if (!dialog) {
            renderPromptLines(refs.botPrompt, 'Has completado todos los diálogos.', false);
            renderPromptLines(refs.botPromptAr, '', true);
            if (refs.userPhrase) refs.userPhrase.textContent = 'Dile "gracias" al bot para despedirte.';
            if (refs.userPhraseAr) refs.userPhraseAr.style.display = 'none';
            if (refs.userPhrasePronLabel) refs.userPhrasePronLabel.style.display = 'none';
            if (refs.userPhrasePronAr) refs.userPhrasePronAr.style.display = 'none';
            if (refs.hint) refs.hint.style.display = 'none';
            if (refs.finalMessage) {
              refs.finalMessage.textContent = '¡Excelente! Has finalizado toda la secuencia.';
              refs.finalMessage.classList.add('active');
            }
            state.completedAll = true;
            return;
          }

          if (refs.dialogProgress) {
            refs.dialogProgress.textContent = 'Diálogo ' + (state.dialogIndex + 1) + ' de ' + dialogs.length;
          }
          if (refs.progressAr) {
            refs.progressAr.textContent = 'الحوار ' + (state.dialogIndex + 1) + ' من ' + dialogs.length + ' · الجملة ' + (state.stepIndex + 1);
          }

          var step = currentStep();
          if (!step) {
            var wasAwaiting = state.awaitingNextDialog;
            state.awaitingNextDialog = true;
            if (refs.nextDialog) {
              refs.nextDialog.classList.toggle('active', state.dialogIndex < dialogs.length - 1);
            }
            var finalText = buildFinalMessage(dialog);
            if (refs.finalMessage) {
              refs.finalMessage.textContent = finalText;
              refs.finalMessage.classList.add('active');
            }
            renderPromptLines(refs.botPrompt, finalText, false);
            renderPromptLines(refs.botPromptAr, '', true);
            state.renderToken += 1;
            var endRenderToken = state.renderToken;
            fetchArabicTranslation(finalText, function(translatedText) {
              if (endRenderToken !== state.renderToken) return;
              var resolved = translatedText || 'الترجمة غير متاحة حالياً.';
              renderPromptLines(refs.botPromptAr, resolved, true);
            });
            if (refs.userPhrase) {
              refs.userPhrase.textContent = state.dialogIndex === dialogs.length - 1
                ? 'Di "gracias" para despedirte.'
                : 'Pulsa "Siguiente diálogo" para continuar.';
            }
            if (refs.userPhraseAr) refs.userPhraseAr.style.display = 'none';
            if (refs.userPhrasePronLabel) refs.userPhrasePronLabel.style.display = 'none';
            if (refs.userPhrasePronAr) refs.userPhrasePronAr.style.display = 'none';
            if (refs.hint) refs.hint.style.display = 'none';
            if (refs.resultHint) refs.resultHint.style.display = 'none';
            setVoiceControlsEnabled(false);
            pushHistory('bot', finalText);
            setStatus('Pulsa "Siguiente diálogo" para continuar.');
            if (!wasAwaiting) {
              var instruction = state.dialogIndex === dialogs.length - 1
                ? ' Di "gracias" para despedirte.'
                : ' Pulsa "Siguiente diálogo" para continuar.';
              if (skipSpeak) {
                speakText = finalText + instruction;
              } else {
                speakBot(finalText + instruction);
              }
            }
            if (state.dialogIndex === dialogs.length - 1) {
              state.completedAll = true;
              if (refs.finalMessage) {
                refs.finalMessage.textContent = finalText + ' Si dices "gracias", contestaré "De nada, ' + (state.name || 'amigo') + '. Adiós."';
              }
            }
            return speakText;
          }

          if (refs.nextDialog) refs.nextDialog.classList.remove('active');
          if (refs.finalMessage) {
            refs.finalMessage.textContent = '';
            refs.finalMessage.classList.remove('active');
          }
          state.awaitingNextDialog = false;
          state.completedAll = false;
          if (state.dialogStarted || state.hasInteracted) {
            showVoiceControls();
            setVoiceControlsEnabled(true);
          }

          var question = formatWithContext(step.botPrompt || '...');
          var userPhrase = formatWithContext(step.userPrompt || 'Repite la frase guiada.');
          var questionAr = formatWithContext(step.botPromptAr || '');
          var userPhraseAr = formatWithContext(step.userPromptAr || '');
          var userPhrasePronAr = formatWithContext(step.userPromptPronAr || toArabicPronunciation(userPhrase));
          var hint = step.hint || '';
          var highlightKeywords = getGrammarHighlightKeywords(dialog);
          var questionKey = state.dialogIndex + '-' + state.stepIndex;
          state.renderToken += 1;
          var renderToken = state.renderToken;

          renderPromptLines(refs.botPrompt, question, false, highlightKeywords);
          renderPromptLines(refs.botPromptAr, questionAr, true);
          if (!questionAr && question) {
            renderPromptLines(refs.botPromptAr, '... جارٍ ترجمة النص', true);
            fetchArabicTranslation(question, function(translatedText) {
              if (renderToken !== state.renderToken) return;
              var resolved = translatedText || 'الترجمة غير متاحة حالياً.';
              renderPromptLines(refs.botPromptAr, resolved, true);
            });
          }
          if (refs.userPhrase) {
            setHighlightedText(refs.userPhrase, userPhrase, false, highlightKeywords);
          }
          if (refs.userPhraseAr) {
            refs.userPhraseAr.textContent = userPhraseAr;
            refs.userPhraseAr.style.display = userPhraseAr ? 'block' : 'none';
          }
          if (!userPhraseAr && userPhrase && refs.userPhraseAr) {
            refs.userPhraseAr.textContent = '... جارٍ ترجمة النص';
            refs.userPhraseAr.style.display = 'block';
            fetchArabicTranslation(userPhrase, function(translatedText) {
              if (renderToken !== state.renderToken) return;
              var resolved = translatedText || 'الترجمة غير متاحة حالياً.';
              if (refs.userPhraseAr) {
                refs.userPhraseAr.textContent = resolved;
                refs.userPhraseAr.style.display = 'block';
              }
            });
          }
          if (refs.userPhrasePronLabel) {
            refs.userPhrasePronLabel.style.display = userPhrasePronAr ? 'block' : 'none';
          }
          if (refs.userPhrasePronAr) {
            refs.userPhrasePronAr.textContent = userPhrasePronAr;
            refs.userPhrasePronAr.style.display = userPhrasePronAr ? 'block' : 'none';
          }
          if (refs.hint) {
            refs.hint.style.display = hint ? 'block' : 'none';
            refs.hint.textContent = hint ? 'Pista: ' + hint : '';
          }
          if (refs.stepProgress) {
            refs.stepProgress.textContent = 'Frase ' + (state.stepIndex + 1) + ' de ' + dialog.steps.length;
          }
          setStatus('Escucha la pregunta y repite la frase guiada.');

          if (state.lastQuestionKey !== questionKey) {
            state.lastQuestionKey = questionKey;
            pushHistory('bot', question);
            if (state.dialogStarted) {
              if (skipSpeak) {
                speakText = question;
              } else {
                speakBot(question);
              }
            }
          }
          return speakText;
        }

        function buildFinalMessage(dialog) {
          var title = dialog && dialog.title ? dialog.title : 'este diálogo';
          var isIntroPresentation = !!(dialog && dialog.id === 'dialogo-1');
          var nameLine = state.name
            ? state.name + ', espero que sigamos practicando juntos.'
            : 'Espero que sigamos practicando juntos.';
          var countryLine = state.country && isIntroPresentation
            ? 'Qué bonito es ' + state.country + '. '
            : '';
          return countryLine + 'Has completado "' + title + '". ' + nameLine;
        }

        function evaluateAnswer(answer) {
          var step = currentStep();
          if (!step) {
            if (state.completedAll) {
              var normalized = normalize(answer);
              if (normalized.includes('gracias')) {
                var farewell = state.name
                  ? 'De nada, ' + state.name + '. Adiós.'
                  : 'De nada. Adiós.';
                pushHistory('user', answer);
                pushHistory('bot', farewell);
                speakBot(farewell);
              }
            }
            return;
          }

          var normalizedAnswer = normalize(answer);
          var correct = false;
          var extractedName = null;
          var extractedCountry = null;

          if (step.capturesName) {
            extractedName = extractName(answer);
            if (extractedName) {
              state.name = extractedName;
              send('context_update', { name: extractedName });
              correct = true;
            } else if (answer.trim().length > 0) {
              correct = true;
            }
          } else if (step.capturesCountry) {
            extractedCountry = extractCountry(answer);
            if (extractedCountry) {
              state.country = extractedCountry;
              send('context_update', { country: extractedCountry });
              correct = true;
            } else if (answer.trim().length > 0) {
              correct = true;
            }
          } else {
            var required = step.minMatches || 1;
            var expectedList = step.expected || [];
            if (step.matchOrder) {
              correct = matchesInOrder(answer, expectedList);
            } else {
              var matchCount = 0;
              for (var k = 0; k < expectedList.length; k++) {
                if (normalizedAnswer.includes(normalize(expectedList[k]))) {
                  matchCount++;
                }
              }
              correct = matchCount >= required;
            }
          }

          pushHistory('user', answer);

          if (correct) {
            showFeedback(true);
            var positive = step.botPositive || '¡Muy bien! 😊';
            if (step.capturesName && extractedName) {
              positive = '¡Encantado, ' + extractedName + '!';
            } else if (step.capturesCountry && extractedCountry) {
              positive = '¡Qué bien! ' + (state.name ? state.name + ', ' : '') + 'eres de ' + extractedCountry + '.';
            }
            var formatted = formatWithContext(positive);
            pushHistory('bot', formatted);
            if (refs.resultHint) refs.resultHint.style.display = 'none';
            state.stepIndex += 1;
            var nextSpeak = renderStep(true);
            if (nextSpeak) {
              speakBotSequence([formatted, nextSpeak]);
            } else {
              speakBot(formatted);
            }
          } else {
            showFeedback(false);
            var retry = 'Inténtalo de nuevo. Recuerda: ' + formatWithContext(step.userPrompt || '');
            if (refs.resultHint) {
              refs.resultHint.style.display = 'block';
              refs.resultHint.textContent = retry;
            }
            pushHistory('bot', retry);
            speakBot(retry);
          }
        }

        function handleAnswer(raw) {
          if (!raw) return;
          if (state.dialogStarted || state.hasInteracted) {
            showVoiceControls();
          }
          evaluateAnswer(raw);
        }

        function resetForStart() {
          var dialog = currentDialog();
          var totalSteps = dialog ? dialog.steps.length : 0;
          renderPromptLines(refs.botPrompt, 'Pulsa "Empezar diálogo" para comenzar.', false);
          renderPromptLines(refs.botPromptAr, '', true);
          if (refs.userPhrase) refs.userPhrase.textContent = '...';
          if (refs.userPhraseAr) {
            refs.userPhraseAr.textContent = '';
            refs.userPhraseAr.style.display = 'none';
          }
          if (refs.userPhrasePronLabel) refs.userPhrasePronLabel.style.display = 'none';
          if (refs.userPhrasePronAr) {
            refs.userPhrasePronAr.textContent = '';
            refs.userPhrasePronAr.style.display = 'none';
          }
          if (refs.hint) refs.hint.style.display = 'none';
          if (refs.resultHint) refs.resultHint.style.display = 'none';
          if (refs.finalMessage) {
            refs.finalMessage.textContent = '';
            refs.finalMessage.classList.remove('active');
          }
          if (refs.botStatus) refs.botStatus.textContent = 'Esperando...';
          if (refs.dialogProgress) {
            refs.dialogProgress.textContent = 'Diálogo ' + (state.dialogIndex + 1) + ' de ' + dialogs.length;
          }
          if (refs.progressAr) {
            refs.progressAr.textContent = 'الحوار ' + (state.dialogIndex + 1) + ' من ' + dialogs.length + ' · الجملة 1';
          }
          if (refs.stepProgress) {
            refs.stepProgress.textContent = 'Frase 1 de ' + (totalSteps || 0);
          }
          if (refs.nextDialog) refs.nextDialog.classList.remove('active');
        }

        function showVoiceControls() {
          if (refs.voiceControls) refs.voiceControls.style.display = 'flex';
          if (refs.startDialog) refs.startDialog.style.display = 'none';
        }

        function setVoiceControlsEnabled(enabled) {
          if (refs.startBtn) refs.startBtn.disabled = false;
          if (refs.stopBtn) refs.stopBtn.disabled = false;
        }

        function goToNextDialog() {
          if (state.dialogIndex >= dialogs.length - 1) {
            state.completedAll = true;
            setStatus('Has finalizado todos los diálogos. Di "gracias" para despedirte.');
            return;
          }
          state.dialogIndex += 1;
          state.stepIndex = 0;
          state.awaitingNextDialog = false;
          state.lastQuestionKey = null;
          if (refs.history) refs.history.innerHTML = '';
          if (refs.resultHint) refs.resultHint.style.display = 'none';
          if (refs.finalMessage) {
            refs.finalMessage.textContent = '';
            refs.finalMessage.classList.remove('active');
          }
          send('progress_update', { dialogIndex: state.dialogIndex });
          resetForStart();
        }

        function resetAllDialogs() {
          state.dialogIndex = 0;
          state.stepIndex = 0;
          state.awaitingNextDialog = false;
          state.lastQuestionKey = null;
          state.completedAll = false;
          state.dialogStarted = false;
          state.hasInteracted = false;
          if (refs.history) refs.history.innerHTML = '';
          if (refs.resultHint) refs.resultHint.style.display = 'none';
          if (refs.finalMessage) {
            refs.finalMessage.textContent = '';
            refs.finalMessage.classList.remove('active');
          }
          setVoiceControlsEnabled(false);
          if (refs.startDialog) refs.startDialog.style.display = 'block';
          send('progress_update', { dialogIndex: state.dialogIndex });
          resetForStart();
          setStatus('Reiniciado. Pulsa "Empezar diálogo".');
        }

        function startDialogFlow() {
          if (state.dialogStarted) return;
          setStatus('Iniciando diálogo...');
          state.dialogStarted = true;
          state.hasInteracted = true;
          if (refs.startDialog) refs.startDialog.style.display = 'none';
          setVoiceControlsEnabled(true);

          renderStep();
          setStatus('Escucha al bot y luego pulsa "Responder" para hablar.');
        }

        var initialized = false;

        function initPage() {
          if (initialized) return;
          refs.botPrompt = document.getElementById('botPrompt');
          refs.botPromptAr = document.getElementById('botPromptAr');
          refs.userPhrase = document.getElementById('userPhrase');
          refs.userPhraseAr = document.getElementById('userPhraseAr');
          refs.userPhrasePronLabel = document.getElementById('userPhrasePronLabel');
          refs.userPhrasePronAr = document.getElementById('userPhrasePronAr');
          refs.hint = document.getElementById('hint');
          refs.status = document.getElementById('status');
          refs.history = document.getElementById('history');
          refs.resultHint = document.getElementById('resultHint');
          refs.finalMessage = document.getElementById('finalMessage');
          refs.warning = document.getElementById('warning');
          refs.dialogProgress = document.getElementById('dialogProgress');
          refs.stepProgress = document.getElementById('stepProgress');
          refs.progressAr = document.getElementById('progressAr');
          refs.nextDialog = document.getElementById('nextDialog');
          refs.botMouth = document.getElementById('botMouth');
          refs.botStatus = document.getElementById('botStatus');
          refs.feedbackFace = document.getElementById('feedbackFace');
          refs.startDialog = document.getElementById('startDialog');
          refs.voiceControls = document.getElementById('voiceControls');
          refs.resetDialog = document.getElementById('resetDialog');

          if (!refs.botPrompt || !refs.startDialog || !refs.status) {
            setTimeout(initPage, 50);
            return;
          }

          initialized = true;

          initRecognition();
          resetForStart();
          setVoiceControlsEnabled(false);
          if (refs.startDialog) refs.startDialog.style.display = 'block';
          setStatus('Listo. Pulsa "Empezar diálogo".');
          window.onerror = function(message, source, line, col) {
            setWarning('Error JS: ' + message + ' (' + line + ':' + col + ')');
          };

          document.addEventListener('click', function(evt) {
            var target = evt && evt.target;
            var id = target && target.id ? target.id : 'sin-id';
            var tag = target && target.tagName ? target.tagName : 'desconocido';
            setStatus('Click: ' + tag + ' #' + id);
          }, true);

          document.addEventListener('touchstart', function(evt) {
            var target = evt && evt.target;
            var id = target && target.id ? target.id : 'sin-id';
            var tag = target && target.tagName ? target.tagName : 'desconocido';
            setStatus('Touch: ' + tag + ' #' + id);
          }, true);

          send('debug', { phase: 'init' });

          if (refs.startDialog) {
            refs.startDialog.onclick = function() {
              startDialogFlow();
            };
          }

          var startBtn = document.getElementById('start');
          if (startBtn) {
            refs.startBtn = startBtn;
            startBtn.onclick = function() {
              if (rec) {
                setWarning('');
                try { rec.start(); } catch (e) { setWarning('Micrófono web falló.'); }
              } else {
                setWarning('Reconocimiento no disponible en este navegador.');
              }
            };
          }

          var stopBtn = document.getElementById('stop');
          if (stopBtn) {
            refs.stopBtn = stopBtn;
            stopBtn.onclick = function() {
              if (rec) {
                try { rec.stop(); } catch (e) { }
              }
            };
          }

          setVoiceControlsEnabled(false);

          if (refs.nextDialog) {
            refs.nextDialog.onclick = function() {
              state.dialogStarted = false;
              if (refs.startDialog) refs.startDialog.style.display = 'block';
              setVoiceControlsEnabled(false);
              goToNextDialog();
            };
          }

          if (refs.resetDialog) {
            refs.resetDialog.onclick = function() {
              resetAllDialogs();
            };
          }

        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initPage);
        } else {
          initPage();
        }

        window.__startDialog = function() {
          try {
            if (!initialized) {
              initPage();
              if (!initialized) {
                if (refs.status) refs.status.textContent = 'Inicializando...';
                setTimeout(function() {
                  if (window.__startDialog) window.__startDialog();
                }, 60);
                return;
              }
            }
            startDialogFlow();
          } catch (e) {
            if (refs.warning) {
              refs.warning.textContent = 'Start error: ' + (e && e.message ? e.message : e);
            }
          }
        };

      })();
      } catch (e) {
        var warningEl = document.getElementById('warning');
        if (warningEl) warningEl.textContent = 'Script crash: ' + (e && e.message ? e.message : e);
      }
    </script>
  </body>
</html>`;

  return rawHtml;
};

type PracticeMode = 'conversacion' | 'gramatica';
const resolvePracticeMode = (value?: string): PracticeMode => (value === 'gramatica' ? 'gramatica' : 'conversacion');
const resolveSingleParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
const resolveFullAccess = (value?: string) => value === '1' || value === 'true';
const FREE_DIALOG_LIMIT = 4;
const LAST_FREE_DIALOG_INDEX = FREE_DIALOG_LIMIT - 1;

export default function HablarEspanolScreen() {
  const router = useRouter();
  const { firebaseUser } = useUser();
  const { mode, fullAccess } = useLocalSearchParams<{ mode?: string | string[]; fullAccess?: string | string[] }>();
  const modeParam = resolveSingleParam(mode);
  const fullAccessByParam = resolveFullAccess(resolveSingleParam(fullAccess));
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(() => resolvePracticeMode(modeParam));
  const modeLocked = modeParam === 'gramatica' || modeParam === 'conversacion';
  const [webVisible, setWebVisible] = useState(false);
  const [webKey, setWebKey] = useState(() => Date.now());
  const [dialogIndex, setDialogIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [isA1Enrolled, setIsA1Enrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  const isGrammar = practiceMode === 'gramatica';
  const hasFullAccess = fullAccessByParam || isA1Enrolled;
  const dialogSet = isGrammar ? GRAMMAR_DIALOGS : GUIDED_DIALOGS;
  const totalDialogs = dialogSet.length;
  const availableDialogs = hasFullAccess ? totalDialogs : Math.min(totalDialogs, FREE_DIALOG_LIMIT);
  const currentDialogDisplay = Math.min(dialogIndex + 1, availableDialogs);
  const modeTitleEs = isGrammar ? 'Gramática guiada' : 'Vamos a hablar español';
  const modeTitleAr = isGrammar ? 'قواعد اللغة الموجّهة' : 'هيا نتحدث الإسبانية';
  const [webContext, setWebContext] = useState<DialogContext>({
    name: null,
    country: null,
    dialogIndex: 0,
  });
  const webRef = useRef<WebView>(null);

  useEffect(() => {
    setPracticeMode(resolvePracticeMode(modeParam));
  }, [modeParam]);

  useEffect(() => {
    let mounted = true;

    const loadA1Enrollment = async () => {
      try {
        setIsCheckingEnrollment(true);
        const userId = firebaseUser?.uid || null;
        const matriculaKeys = [
          userId ? `matricula_A1_completada_${userId}` : null,
          'matricula_A1_completada_guest',
          'matricula_A1_completada',
          'matricula_A1A2_completada',
        ].filter(Boolean) as string[];
        const entries = await AsyncStorage.multiGet(Array.from(new Set(matriculaKeys)));
        const hasA1Matricula = entries.some(([, value]) => value === 'true');
        if (mounted) {
          setIsA1Enrolled(hasA1Matricula);
        }
      } catch (error) {
        if (mounted) {
          setIsA1Enrolled(false);
        }
      } finally {
        if (mounted) {
          setIsCheckingEnrollment(false);
        }
      }
    };

    loadA1Enrollment();

    return () => {
      mounted = false;
    };
  }, [firebaseUser?.uid]);

  useEffect(() => {
    setDialogIndex(0);
  }, [practiceMode]);

  useEffect(() => {
    if (!hasFullAccess && dialogIndex > LAST_FREE_DIALOG_INDEX) {
      setDialogIndex(LAST_FREE_DIALOG_INDEX);
    }
  }, [dialogIndex, hasFullAccess]);

  const speakSequence = (texts: string[], index = 0) => {
    if (!texts || index >= texts.length) return;
    const text = texts[index];
    if (!text || text.trim().length === 0) {
      speakSequence(texts, index + 1);
      return;
    }
    Speech.speak(text, {
      language: 'es-ES',
      rate: 0.95,
      onDone: () => speakSequence(texts, index + 1),
      onStopped: () => speakSequence(texts, index + 1),
      onError: () => speakSequence(texts, index + 1),
    });
  };

  const dialogHtml = useMemo(
    () => buildDialogHtml(dialogSet, webContext),
    [dialogSet, webContext, webKey, HTML_REVISION, buildDialogHtml]
  );

  const showEnrollmentAlert = () => {
    Alert.alert(
      'Acceso completo en A1',
      `Has llegado al límite gratuito (${FREE_DIALOG_LIMIT} diálogos). Matricúlate en A1 para desbloquear todos los diálogos.`,
      [
        { text: 'Ahora no', style: 'cancel' },
        { text: 'Matricularme', onPress: () => router.push('/MatriculaScreen') },
      ]
    );
  };

  const handleStart = async () => {
    if (isCheckingEnrollment) {
      Alert.alert('Verificando matrícula', 'Espera un momento y vuelve a intentarlo.');
      return;
    }

    if (!hasFullAccess && dialogIndex >= FREE_DIALOG_LIMIT) {
      showEnrollmentAlert();
      return;
    }

    const granted = await requestMicrophonePermission();
    if (!granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso al micrófono para practicar.');
      return;
    }
    setWebContext({
      name: userName,
      country: userCountry,
      dialogIndex,
    });
    setWebVisible(true);
    setWebKey(Date.now());
  };

  const handleCloseWeb = () => {
    setWebVisible(false);
    setWebKey(Date.now());
  };

  const handleWebMessage = (event: WebViewMessageEvent) => {
    try {
      const message: WebMessage = JSON.parse(event.nativeEvent.data);
      if (message.type === 'context_update') {
        if (typeof message.payload?.name === 'string') {
          setUserName(message.payload.name);
        }
        if (typeof message.payload?.country === 'string') {
          setUserCountry(message.payload.country);
        }
      }
      if (message.type === 'progress_update') {
        const nextDialogIndex = message.payload?.dialogIndex;
        if (typeof nextDialogIndex === 'number') {
          if (!hasFullAccess && nextDialogIndex >= FREE_DIALOG_LIMIT) {
            setDialogIndex(LAST_FREE_DIALOG_INDEX);
            setWebVisible(false);
            setWebKey(Date.now());
            showEnrollmentAlert();
            return;
          }
          setDialogIndex(nextDialogIndex);
        }
      }
      if (message.type === 'speak') {
        const texts = message.payload?.texts;
        if (Array.isArray(texts) && texts.length > 0) {
          try {
            Speech.stop();
          } catch {}
          speakSequence(texts);
          return;
        }
        const text = message.payload?.text;
        if (typeof text === 'string' && text.trim().length > 0) {
          try {
            Speech.stop();
          } catch {}
          Speech.speak(text, { language: 'es-ES', rate: 0.95 });
        }
      }
    } catch (error) {
      // no-op
    }
  };

  if (webVisible) {
    return (
      <View style={styles.webContainer}>
        <View style={styles.webHeader}>
          <TouchableOpacity onPress={handleCloseWeb} style={styles.closeButton}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.webTitle}>Diálogo {currentDialogDisplay} / {availableDialogs}</Text>
          <View style={{ width: 36 }} />
        </View>
        <WebView
          ref={webRef}
          key={webKey}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          source={{ html: dialogHtml }}
          onMessage={handleWebMessage}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          // @ts-ignore: react-native-webview types missing
          onPermissionRequest={(event: any) => {
            try {
              event.grant(event.resources);
            } catch {}
          }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#04060c", "#111827"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#facc15" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practica con el profesor robótico</Text>
        <Text style={styles.headerTitleArabic}>تدرّب مع الأستاذ الروبوتي</Text>
        <Text style={styles.headerSubtitle}>
          Modo actual: {modeTitleEs}. El bot recordará tu nombre
          {userName ? ` (${userName})` : ''}
          {userCountry ? ` y tu país (${userCountry})` : ''}.
        </Text>
        <Text style={styles.headerSubtitleArabic}>
          الوضع الحالي: {modeTitleAr}. سيتذكر البوت اسمك
          {userName ? ` (${userName})` : ''}
          {userCountry ? ` وبلدك (${userCountry})` : ''}.
        </Text>
      </LinearGradient>

      <ScrollView style={styles.bodyScroll} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          <Text style={styles.sectionTitleArabic}>كيف يعمل؟</Text>
          {!modeLocked && (
            <View style={styles.modeSelector}>
              <TouchableOpacity
                style={[styles.modeChip, !isGrammar && styles.modeChipActive]}
                onPress={() => setPracticeMode('conversacion')}
              >
                <Text style={[styles.modeChipText, !isGrammar && styles.modeChipTextActive]}>Conversación práctica</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeChip, isGrammar && styles.modeChipActive]}
                onPress={() => setPracticeMode('gramatica')}
              >
                <Text style={[styles.modeChipText, isGrammar && styles.modeChipTextActive]}>Gramática guiada</Text>
              </TouchableOpacity>
            </View>
          )}
          {!modeLocked && (
            <Text style={styles.modeHelper}>
              Selecciona un modo y pulsa “{isGrammar ? 'Empezar lección' : 'Empezar diálogo'}”.
            </Text>
          )}
          {hasFullAccess ? (
            <Text style={styles.accessBadgeOk}>Acceso completo activado para A1.</Text>
          ) : (
            <Text style={styles.accessBadgeWarn}>
              Acceso demo: diálogos 1-{FREE_DIALOG_LIMIT}. Matricúlate en A1 para desbloquear todo.
            </Text>
          )}
          <Text style={styles.stepText}>1. Pulsa el botón “Empezar diálogo”.</Text>
          <Text style={styles.stepTextArabic}>١. اضغط على زر “ابدأ الحوار”.</Text>
          <Text style={styles.stepText}>
            {isGrammar
              ? '2. El bot explicará la regla y luego te pedirá repetir ejemplos.'
              : '2. El WebView mostrará la pregunta del bot y la frase exacta que debes decir.'}
          </Text>
          <Text style={styles.stepTextArabic}>
            {isGrammar
              ? '٢. سيشرح البوت القاعدة ثم يطلب منك تكرار الأمثلة.'
              : '٢. ستعرض الشاشة سؤال البوت والعبارة الدقيقة التي يجب أن تقولها.'}
          </Text>
          <Text style={styles.stepText}>3. Responde con tu voz y espera la reacción del bot.</Text>
          <Text style={styles.stepTextArabic}>٣. أجب بصوتك وانتظر ردّ البوت.</Text>
          <Text style={styles.stepText}>4. Al terminar cada diálogo aparecerá “Siguiente diálogo”. Completa todos.</Text>
          <Text style={styles.stepTextArabic}>٤. عند انتهاء كل حوار سيظهر زر “الحوار التالي”. أكمل الجميع.</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Ionicons name="mic" size={18} color="#0f172a" />
            <Text style={styles.startButtonText}>{isGrammar ? 'Empezar lección' : 'Empezar diálogo'}</Text>
            <Text style={styles.startButtonTextArabic}>{isGrammar ? 'ابدأ الدرس' : 'ابدأ الحوار'}</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Progreso actual ({isGrammar ? 'gramática' : 'conversación'}): diálogo {currentDialogDisplay} de {availableDialogs}.
          </Text>
          <Text style={styles.helperTextArabic}>
            التقدم الحالي ({isGrammar ? 'القواعد' : 'المحادثة'}): الحوار {currentDialogDisplay} من {availableDialogs}.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04060c',
  },
  header: {
    paddingTop: 52,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(250,204,21,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#facc15',
  },
  headerTitleArabic: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    color: '#fef3c7',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#cbd5f5',
  },
  headerSubtitleArabic: {
    marginTop: 6,
    fontSize: 13,
    color: '#e2e8f0',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bodyScroll: {
    flex: 1,
  },
  body: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#0b1224',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 18 },
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 16,
  },
  sectionTitleArabic: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 14,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  modeChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.35)',
    backgroundColor: 'rgba(15,23,42,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeChipActive: {
    borderColor: '#facc15',
    backgroundColor: '#facc15',
  },
  modeChipText: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  modeChipTextActive: {
    color: '#0f172a',
  },
  modeHelper: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 12,
  },
  accessBadgeOk: {
    color: '#86efac',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  accessBadgeWarn: {
    color: '#fca5a5',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  stepText: {
    color: '#cbd5f5',
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 22,
  },
  stepTextArabic: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  startButton: {
    marginTop: 16,
    backgroundColor: '#facc15',
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  startButtonTextArabic: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  helperText: {
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 13,
  },
  helperTextArabic: {
    marginTop: 6,
    color: '#e2e8f0',
    fontSize: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#050914',
  },
  webHeader: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#050914',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
});
