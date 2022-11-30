const createIdGenerator = () => {
  let i = localStorage["id"] ? +localStorage["id"] + 1 : 0;

  return () => {
    localStorage.setItem("id", i);
    return i++;
  };
};

export default createIdGenerator;
