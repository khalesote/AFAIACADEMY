import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioButton from './AudioButton';

interface AudioTextSectionProps {
  title?: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  language?: string;
  showAudioForTitle?: boolean;
  showAudioForContent?: boolean;
  style?: any;
  titleStyle?: any;
  contentStyle?: any;
}

export default function AudioTextSection({
  title,
  titleAr,
  content,
  contentAr,
  language = 'es-ES',
  showAudioForTitle = true,
  showAudioForContent = true,
  style,
  titleStyle,
  contentStyle
}: AudioTextSectionProps) {

  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {showAudioForTitle && (
            <AudioButton 
              text={title} 
              language={language}
              size="small"
              showText={false}
            />
          )}
        </View>
      )}
      
      {titleAr && (
        <View style={styles.titleArContainer}>
          <Text style={styles.titleAr}>{titleAr}</Text>
          <AudioButton 
            text={titleAr} 
            language="ar-SA"
            size="small"
            showText={false}
            color="#666"
          />
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={[styles.content, contentStyle]}>{content}</Text>
        {showAudioForContent && (
          <AudioButton 
            text={content} 
            language={language}
            size="small"
            color="#4CAF50"
          />
        )}
      </View>

      {contentAr && (
        <View style={styles.contentArContainer}>
          <Text style={styles.contentAr}>{contentAr}</Text>
          <AudioButton 
            text={contentAr} 
            language="ar-SA"
            size="small"
            color="#666"
            showText={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleArContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentArContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    flex: 1,
  },
  titleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
    marginRight: 8,
  },
  contentAr: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1,
    marginLeft: 8,
  },
});


