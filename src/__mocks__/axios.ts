// import mockAxios from 'jest-mock-axios'
// export default mockAxios

export default {
  post: jest.fn(async () => await Promise.resolve())
}
