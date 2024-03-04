import { Menu } from "@/components/Menu"

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-orange-400 text-2xl mb-8">
        Desafio para Desenvolvedor - Inmediam
      </h1>
      <Menu />
    </div>
  )
}