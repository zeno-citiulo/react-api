import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import NewArticleForm from "./components/NewArticleForm";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);

  const [editingIndex, setEditingIndex] = useState(-1);

  const [editingFormData, setEditingFormData] = useState({
    id: null,
    title: "",
    image: "",
    content: "",
    category: "",
    tags: {
      React: false,
      Vue: false,
      Angular: false,
      Svelte: false,
    },
    published: false,
  });


  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei post:", error);
      });
  }, []);


  const handleAddArticle = (newArticle) => {
    axios
      .post("http://localhost:3000/posts", newArticle)
      .then((response) => {
        const createdPost = response.data;
        setArticles((prevArticles) => [...prevArticles, createdPost]);
      })
      .catch((error) => {
        console.error("Errore durante la creazione del post:", error);
      });
  };

  const handleDelete = (index) => {
    const idToDelete = articles[index].id;

    axios
      .delete(`http://localhost:3000/posts/${idToDelete}`)
      .then(() => {
        setArticles((prevArticles) => prevArticles.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      });
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingFormData(articles[index]);
  };

  const handleSave = (index) => {
    const postId = editingFormData.id;
    axios
      .put(`http://localhost:3000/posts/${postId}`, editingFormData)
      .then((response) => {
        const updatedPost = response.data;
        const newArticles = [...articles];
        newArticles[index] = updatedPost;
        setArticles(newArticles);

        setEditingIndex(-1);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };


  const handleCancel = () => {
    setEditingIndex(-1);
    setEditingFormData({
      id: null,
      title: "",
      image: "",
      content: "",
      category: "",
      tags: {
        React: false,
        Vue: false,
        Angular: false,
        Svelte: false,
      },
      published: false,
    });
  };

  return (
    <div className="container">
      <h1>Articoli di Blog</h1>

      <NewArticleForm onAddArticle={handleAddArticle} />

      <ArticleList
        articles={articles}
        editingIndex={editingIndex}
        editingFormData={editingFormData}
        setEditingFormData={setEditingFormData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;