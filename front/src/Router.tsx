import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contracts } from './pages/Contracts'
import { Plan } from './pages/Plan'
import { UserHistoryPage } from './pages/Historic'

export function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/plan/:id" element={<Plan />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/historic" element={<UserHistoryPage />} />
    </Routes>
  )
}
