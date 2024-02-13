import './global.css'
import styles from './App.module.css'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post, PostType } from './components/Post'

const posts: PostType[] = [
  { 
    id: 1,
    author: {
      avatarUrl: 'https://github.com/pabriciosam.png',
      name: 'Pabrício Samagaio',
      role: 'Dev. Full Stack'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉jane.design/doctorcare'}
    ],
    publishedAt: new Date('2023-01-22 13:12:00')
  },
  { 
    id: 2,
    author: {
      avatarUrl: 'https://github.com/pabriciosam.png',
      name: 'Pabrício 123',
      role: 'Outro Dev.'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: '👉jane.design/doctorcare'}
    ],
    publishedAt: new Date('2024-01-23 16:58:00')
  }
]

export function App() {
  return (
    <div>
      <Header></Header>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return(
                <Post key={post.id}
                  post={post}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}