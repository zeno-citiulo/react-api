import React from "react";

function ArticleItem({ article }) {
  const renderTags = (tagsObj) =>
    Object.keys(tagsObj)
      .filter((tag) => tagsObj[tag])
      .join(", ");

  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <span style={{ fontWeight: "bold" }}>{article.title}</span>
      {article.image && (
        <div>
          <img
            src={article.image}
            alt={article.title}
            style={{ width: "100px", margin: "10px 0" }}
          />
        </div>
      )}
      {article.content && <p>{article.content}</p>}
      {article.category && <p>Categoria: {article.category}</p>}
      <p>Tags: {renderTags(article.tags) || "Nessun tag"}</p>
      <p>Pubblicato: {article.published ? "Sì" : "No"}</p>
    </div>
  );
}

export default ArticleItem;