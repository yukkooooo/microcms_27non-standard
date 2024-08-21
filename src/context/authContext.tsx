import React, { useContext, useState, useEffect } from 'react'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// コンテキストを作成
const AuthContext = React.createContext<any>(null)

export function useAuth() {
  // useContextで作成したコンテキストを呼び出す
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 初回レンダリングのみ関数を実行させる
  useEffect(() => {
    // onAuthStateChangedでログインの状態を監視する
    const unsubscribe = onAuthStateChanged(auth, async user => {
      // ユーザー情報をcurrentUserに格納する
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = { currentUser }

  // 全コンポーネントをラッピングするためのプロバイダー
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}