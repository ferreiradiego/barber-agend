const Footer = () => {
  return (
    <footer className="flex justify-center items-center container h-10 border-t-2 border-zinc-500/20 mt-6">
      <p>&copy; {new Date().getFullYear()}, All rights reserved</p>
    </footer>
  );
};

export default Footer;
