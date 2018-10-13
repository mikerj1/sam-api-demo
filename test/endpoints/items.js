const chakram = require('chakram')
const expect = chakram.expect
const endpoint = `${process.env.API_ENDPOINT}/items`

let id

describe('GetItems', () => {
  it('Should return a list of items', async () => {
    let response = await chakram.get(endpoint)
    expect(response).to.have.status(200)
    expect(response.body).to.be.an.instanceof(Array)
  }).timeout(5000)
})

describe('CreateItem', () => {
  it('Should create an item and return that created item', async () => {
    let postBody = {
      name: `TestItem-${Math.floor(new Date().getTime)}`,
      type: 'test'
    }
    let response = await chakram.post(endpoint, postBody)
    expect(response).to.have.status(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.have.property('id').that.is.a('string')
    expect(response.body).to.have.property('name').that.equals(postBody.name)
    expect(response.body).to.have.property('type').that.equals(postBody.type)

    id = response.body.id
  }).timeout(5000)
})

describe('DeleteItem', () => {
  it('Should delete an item', async () => {
    let response = await chakram.delete(`${endpoint}/${id}`)
    expect(response).to.have.status(200)
  }).timeout(5000)
})