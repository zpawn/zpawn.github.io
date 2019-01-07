/**
 * @param {Object} res
 * @return {Array}
 */
const parseResponseItems = res => {
  let data = [];
  res.forEach(item => {
    data.push({
      id: item.id,
      ...item.data()
    });
  });

  return data;
};

export { parseResponseItems };
