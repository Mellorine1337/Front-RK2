import { Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { fetchNews } from '../api/newsApi';
import { NewsArticle } from '../api/types'; // Импортируем интерфейс

export default function HomeScreen() {
  const [news, setNews] = useState<NewsArticle[]>([]); // Указываем тип для новостей
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchNews();
      setNews(articles);
      setLoading(false);
    };

    getNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.urlToImage ? (
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
          ) : (
            <View style={styles.image} /> // Пустое место, если нет изображения
          )}
          <Text style={styles.title}>{item.title || 'No title available'}</Text>
          <Text style={styles.description}>{item.description || 'No description available'}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});