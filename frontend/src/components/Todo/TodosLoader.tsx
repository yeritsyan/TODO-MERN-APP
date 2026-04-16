const TodosLoader = () => {
  return Array.from({ length: 5 }, (_, i) => (
    <div key={`currTod-${i}`} className="skeleton-item">
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div className="skeleton-bar" style={{ width: "25%" }}></div>
        <div className="skeleton-bar" style={{ width: "55%" }}></div>
      </div>
      <div style={{ width: "80px" }}>
        <div
          className="skeleton-bar"
          style={{ width: "100%", height: "2rem" }}
        ></div>
      </div>
    </div>
  ));
};

export default TodosLoader;
