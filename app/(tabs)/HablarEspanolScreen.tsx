import React, { useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { requestMicrophonePermission } from '../../utils/requestMicrophonePermission';
import { GUIDED_DIALOGS, type GuidedDialog } from '../../data/guidedDialogs';

type DialogContext = {
  name: string | null;
  country: string | null;
  dialogIndex: number;
};

type WebMessage = {
  type: string;
  payload?: any;
};

const TOTAL_DIALOGS = GUIDED_DIALOGS.length;
const HTML_REVISION = Date.now();

const escapeForScript = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

const buildDialogHtml = (dialogs: GuidedDialog[], context: DialogContext) => {
  const safeDialogs = escapeForScript(dialogs);
  const safeContext = escapeForScript(context);

  return `<!DOCTYPE html>
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
      .user-prompt { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 12px; margin-top: 12px; }
      .user-prompt-title { font-size: 11px; color: #fbbf24; text-transform: uppercase; margin-bottom: 4px; }
      .user-prompt-text { font-size: 15px; color: #fef3c7; font-weight: 600; }
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
          <span id="dialogProgress">Diálogo 1 de ${TOTAL_DIALOGS}</span> · <span id="stepProgress">Frase 1</span>
          <span class="arabic" id="progressAr">الحوار 1 من ${TOTAL_DIALOGS} · الجملة 1</span>
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
        <div class="user-prompt">
          <div class="user-prompt-title">📢 Di esta frase:<span class="arabic">📢 قل هذه العبارة</span></div>
          <div class="user-prompt-text" id="userPhrase">...</div>
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
        var dialogs = ${safeDialogs};
        var initialContext = ${safeContext};
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
          dialogStarted: false
        };

        var refs = {};
        var rec = null;
        var lastTranscript = '';
        var lastHandled = '';

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
            .replace(/[\\u0300-\\u036f]/g, '')
            .replace(/[^a-z0-9\\s]/g, ' ')
            .replace(/\\s+/g, ' ')
            .trim();
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
            if (refs.botPrompt) refs.botPrompt.textContent = 'Has completado todos los diálogos.';
            if (refs.userPhrase) refs.userPhrase.textContent = 'Dile "gracias" al bot para despedirte.';
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
            var finalText = buildFinalMessage(dialog.title);
            if (refs.finalMessage) {
              refs.finalMessage.textContent = finalText;
              refs.finalMessage.classList.add('active');
            }
            if (refs.botPrompt) refs.botPrompt.textContent = finalText;
            if (refs.userPhrase) {
              refs.userPhrase.textContent = state.dialogIndex === dialogs.length - 1
                ? 'Di "gracias" para despedirte.'
                : 'Pulsa "Siguiente diálogo" para continuar.';
            }
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
          var hint = step.hint || '';
          var questionKey = state.dialogIndex + '-' + state.stepIndex;

          if (refs.botPrompt) refs.botPrompt.textContent = question;
          if (refs.userPhrase) refs.userPhrase.textContent = userPhrase;
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

        function buildFinalMessage(title) {
          var nameLine = state.name
            ? state.name + ', espero que sigamos practicando juntos.'
            : 'Espero que sigamos practicando juntos.';
          var countryLine = state.country && state.dialogIndex === 0
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
            var matchCount = 0;
            for (var k = 0; k < expectedList.length; k++) {
              if (normalizedAnswer.includes(normalize(expectedList[k]))) {
                matchCount++;
              }
            }
            correct = matchCount >= required;
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
          if (refs.botPrompt) refs.botPrompt.textContent = 'Pulsa "Empezar diálogo" para comenzar.';
          if (refs.userPhrase) refs.userPhrase.textContent = '...';
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

          var step = currentStep();
          var question = formatWithContext(step && step.botPrompt ? step.botPrompt : '¿Cómo te llamas?');
          var userAnswer = formatWithContext(step && step.userPrompt ? step.userPrompt : 'Me llamo [tu nombre]');
          var greeting = '¡Hola! Soy tu asistente de español. Vamos a practicar juntos. ' + question;
          pushHistory('bot', greeting);
          speakBot(greeting);
          state.lastQuestionKey = state.dialogIndex + '-' + state.stepIndex;
          renderStep();
          if (refs.botPrompt) refs.botPrompt.textContent = question;
          if (refs.userPhrase) refs.userPhrase.textContent = userAnswer;
          setStatus('Escucha al bot y luego pulsa "Responder" para hablar.');
        }

        var initialized = false;

        function initPage() {
          if (initialized) return;
          refs.botPrompt = document.getElementById('botPrompt');
          refs.userPhrase = document.getElementById('userPhrase');
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
};

export default function HablarEspanolScreen() {
  const router = useRouter();
  const [webVisible, setWebVisible] = useState(false);
  const [webKey, setWebKey] = useState(() => Date.now());
  const [dialogIndex, setDialogIndex] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [webContext, setWebContext] = useState<DialogContext>({
    name: null,
    country: null,
    dialogIndex: 0,
  });
  const webRef = useRef<WebView>(null);

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
    () => buildDialogHtml(GUIDED_DIALOGS, webContext),
    [webContext, webKey, HTML_REVISION, buildDialogHtml]
  );

  const handleStart = async () => {
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
        if (typeof message.payload?.dialogIndex === 'number') {
          setDialogIndex(message.payload.dialogIndex);
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
          <Text style={styles.webTitle}>Diálogo {dialogIndex + 1} / {TOTAL_DIALOGS}</Text>
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
        <Text style={styles.headerTitle}>Vamos a hablar español</Text>
        <Text style={styles.headerTitleArabic}>هيا نتحدث الإسبانية</Text>
        <Text style={styles.headerSubtitle}>
          El bot recordará tu nombre
          {userName ? ` (${userName})` : ''}
          {userCountry ? ` y tu país (${userCountry})` : ''}.
        </Text>
        <Text style={styles.headerSubtitleArabic}>
          سيتذكر البوت اسمك
          {userName ? ` (${userName})` : ''}
          {userCountry ? ` وبلدك (${userCountry})` : ''}.
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          <Text style={styles.sectionTitleArabic}>كيف يعمل؟</Text>
          <Text style={styles.stepText}>1. Pulsa el botón “Empezar diálogo”.</Text>
          <Text style={styles.stepTextArabic}>١. اضغط على زر “ابدأ الحوار”.</Text>
          <Text style={styles.stepText}>2. El WebView mostrará la pregunta del bot y la frase exacta que debes decir.</Text>
          <Text style={styles.stepTextArabic}>٢. ستعرض الشاشة سؤال البوت والعبارة الدقيقة التي يجب أن تقولها.</Text>
          <Text style={styles.stepText}>3. Responde con tu voz y espera la reacción del bot.</Text>
          <Text style={styles.stepTextArabic}>٣. أجب بصوتك وانتظر ردّ البوت.</Text>
          <Text style={styles.stepText}>4. Al terminar cada diálogo aparecerá “Siguiente diálogo”. Completa los 10.</Text>
          <Text style={styles.stepTextArabic}>٤. عند انتهاء كل حوار سيظهر زر “الحوار التالي”. أكمل العشرة.</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Ionicons name="mic" size={18} color="#0f172a" />
            <Text style={styles.startButtonText}>Empezar diálogo</Text>
            <Text style={styles.startButtonTextArabic}>ابدأ الحوار</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Progreso actual: diálogo {dialogIndex + 1} de {TOTAL_DIALOGS}.
          </Text>
          <Text style={styles.helperTextArabic}>
            التقدم الحالي: الحوار {dialogIndex + 1} من {TOTAL_DIALOGS}.
          </Text>
        </View>
      </View>
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
  body: {
    flex: 1,
    padding: 24,
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
