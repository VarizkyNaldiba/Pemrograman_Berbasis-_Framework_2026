const useSWR = jest.fn(() => ({ data: undefined, isLoading: false, error: null }))
module.exports = useSWR
module.exports.default = useSWR
