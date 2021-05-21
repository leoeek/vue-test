import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises' //para aguardar a promise

jest.mock('@/http') //mock de simulação

const leiloes = [
  {
    "id": 1,
    "produto": "Video Game",
    "descricao": "Um video game bem bacana, com vários jogos exclusivos.",
    "lanceInicial": 1000
  },
  {
    "id": 2,
    "produto": "Notebook",
    "descricao": "Completinho, quase novo. A diversão é garantida!",
    "lanceInicial": 500
  },
  {
    "id": 3,
    "produto": "Livro da Casa do Código",
    "descricao": "Um livro super completo, sobre um assunto incrível.",
    "lanceInicial": 500
  },
  {
    "produto": "Ebook da Casa do Código",
    "descricao": "Um livro com um conteúdo muito interessante sobre VueJS",
    "lanceInicial": "500",
    "id": 4
  }
]

describe('Um avalidador que se conecta com a API', () => {
  test('mostrar todos os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('não há leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
