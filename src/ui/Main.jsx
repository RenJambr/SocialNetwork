function Main({ children, classname = "" }) {
  return (
    <main
      className={`bg-gray-700 overflow-hidden pt-[60px] md:pt-[80px] min-h-[100vh] ${classname}`}
    >
      {children}
    </main>
  );
}

export default Main;
