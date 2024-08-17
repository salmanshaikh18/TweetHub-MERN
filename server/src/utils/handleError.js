export const handleError = (error, errorBlockName, res) => {
  console.log(`Error occurs inside ${errorBlockName}: ${error}`);
  res.status(500).json({
    message: `Someting went wrong while ${errorBlockName}`,
    success: false,
    error: `${error}`,
  });
};
