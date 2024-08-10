export const sendInternalError = async (req, res) => {
  return res.status(500).json({
    estatus: false,
    message: 'Internal error'
  })
}