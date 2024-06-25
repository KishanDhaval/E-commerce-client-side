import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue, parent, setParent, categories }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label>Parent Category</label>
        <select
          className="form-control"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">Root</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default CategoryForm;
