const Layout: React.FC = ({ children }) => {
  return (
    <div className="p-10">
      <div className="text-gray-900 text-3xl font-extrabold tracking-tight my-8">
        Fancy Pizza Maker
      </div>
      <div className="grid grid-cols-3 gap-x-10">{children}</div>
    </div>
  );
};

export default Layout;
