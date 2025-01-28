import React from "react";

function EditArticleForm({
  index,
  editingFormData,
  setEditingFormData,
  onSave,
  onCancel,
}) {
  const availableTags = ["React", "Vue", "Angular", "Svelte"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updated = { ...editingFormData };

    if (type === "checkbox" && availableTags.includes(name)) {
      updated.tags = {
        ...updated.tags,
        [name]: checked,
      };
    } else if (type === "checkbox" && name === "published") {
      updated.published = checked;
    } else {
      updated[name] = value;
    }

    setEditingFormData(updated);
  };

  return (
    <>
      <input
        type="text"
        name="title"
        value={editingFormData.title}
        onChange={handleChange}
        placeholder="Titolo dell'articolo"
      />
      <input
        type="text"
        name="image"
        value={editingFormData.image}
        onChange={handleChange}
        placeholder="URL immagine"
      />
      <textarea
        name="content"
        value={editingFormData.content}
        onChange={handleChange}
        placeholder="Contenuto dell'articolo"
      />
      <select
        name="category"
        value={editingFormData.category}
        onChange={handleChange}
      >
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
              checked={editingFormData.tags[tag]}
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
            checked={editingFormData.published}
            onChange={handleChange}
          />
          Pubblica articolo
        </label>
      </div>

      <div>
        <button onClick={() => onSave(index)}>Salva</button>
        <button onClick={onCancel}>Annulla</button>
      </div>
    </>
  );
}

export default EditArticleForm;