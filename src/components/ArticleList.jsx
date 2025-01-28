import React from "react";
import ArticleItem from "./ArticleItem";
import EditArticleForm from "./EditArticleForm";

function ArticleList({
  articles,
  editingIndex,
  editingFormData,
  setEditingFormData,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  return (
    <ul className="article-list">
      {articles.map((article, index) => {
        if (editingIndex === index) {
          return (
            <li key={index} className="article-item">
              <EditArticleForm
                index={index}
                editingFormData={editingFormData}
                setEditingFormData={setEditingFormData}
                onSave={onSave}
                onCancel={onCancel}
              />
            </li>
          );
        } else {
          return (
            <li key={index} className="article-item">
              <ArticleItem article={article} />
              <div>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(index)}
                >
                  &#x1f5d1;
                </button>
                <button onClick={() => onEdit(index)}>Modifica</button>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ArticleList;