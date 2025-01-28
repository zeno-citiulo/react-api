import React, { useState } from "react";

function NewArticleForm({ onAddArticle }) {
  const availableTags = ["React", "Vue", "Angular", "Svelte"];

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && availableTags.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        tags: {
          ...prev.tags,
          [name]: checked,
        },
      }));
    } else if (type === "checkbox" && name === "published") {
      setFormData((prev) => ({
        ...prev,
        published: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddArticle(formData);

    setFormData({
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
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Inserisci titolo articolo"
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL immagine"
      />

      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Contenuto dell'articolo"
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Seleziona categoria</option>
        <option value="tech">Tech</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="finance">Finance</option>
      </select>

      <div>
        <span>Tags:</span>
        {availableTags.map((tag) => (
          <label key={tag} style={{ marginLeft: "8px" }}>
            <input
              type="checkbox"
              name={tag}
              checked={formData.tags[tag]}
              onChange={handleChange}
            />
            {tag}
          </label>
        ))}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Pubblica articolo
        </label>
      </div>

      <button type="submit">Aggiungi</button>
    </form>
  );
}

export default NewArticleForm;