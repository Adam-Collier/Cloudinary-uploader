let errorStrip = errorText => {
  return `
<div class="error">${errorText}</div>
`;
};

let successStrip = successText => {
  return `
<div class="success">${successText}</div>
`;
};

module.exports = {
  errorStrip,
  successStrip
};
