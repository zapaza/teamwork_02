import React, { useRef, useEffect, useState } from 'react'

interface Position {
  id?: number
  x: number
  y: number
}

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [asteroids, setAsteroids] = useState<Position[]>([])
  const [score, setScore] = useState<number>(0)
  const gameOverRef = useRef<boolean>(false)
  const planePositionRef = useRef<Position>({ x: 400, y: 550 })
  const [planePosition, setPlanePosition] = useState<Position>({
    x: 400,
    y: 550,
  }) // Для перерисовки самолета
  const [bullets, setBullets] = useState<Position[]>([])
  const bulletsRef = useRef<Position[]>([])
  const asteroidsRef = useRef<Position[]>([])

  // Обновляем ссылки при изменении стейта пуль или астероидов
  useEffect(() => {
    bulletsRef.current = bullets
  }, [bullets])

  useEffect(() => {
    asteroidsRef.current = asteroids
  }, [asteroids])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          planePositionRef.current.x = Math.max(
            planePositionRef.current.x - 10,
            0
          )
          break
        case 'ArrowRight':
          planePositionRef.current.x = Math.min(
            planePositionRef.current.x + 10,
            1200
          )
          break
        case 'ArrowUp':
          planePositionRef.current.y = Math.max(
            planePositionRef.current.y - 10,
            0
          )
          break
        case 'ArrowDown':
          planePositionRef.current.y = Math.min(
            planePositionRef.current.y + 10,
            800
          )
          break
        case ' ':
          setBullets(bullets => [
            ...bullets,
            { id: Math.random(), ...planePositionRef.current },
          ]) // Создаем новую пулю на позиции самолета
          break
      }

      // Обновляем state для вызова перерисовки
      setPlanePosition({ ...planePositionRef.current })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        const x = Math.random() * 1200
        setAsteroids(asteroids => [
          ...asteroids,
          { id: Math.random(), x, y: 0 },
        ])
      }

      setBullets(bullets =>
        bullets
          .map(bulletPos => ({ ...bulletPos, y: bulletPos.y - 10 }))
          .filter(bulletPos => bulletPos.y > 0)
      )

      // Проверка столкновения
      bulletsRef.current.forEach(bullet => {
        asteroidsRef.current.forEach((asteroid, index) => {
          const dx = bullet.x - asteroid.x
          const dy = bullet.y - asteroid.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 10 + 5) {
            setScore(score => score + 1)
            setBullets(bullets => bullets.filter(b => b.id !== bullet.id))
            setAsteroids(asteroids => asteroids.filter((a, i) => i !== index))
          }
        })
      })

      setAsteroids(asteroids =>
        asteroids
          .map(pos => ({ ...pos, y: pos.y + (4 + score * 0.01) })) // увеличиваем скорость астероидов
          .filter(pos => {
            if (pos.y > 800) {
              setScore(score => score + 1) // Увеличиваем счет
              return false
            }
            const dx = pos.x - planePositionRef.current.x
            const dy = pos.y - planePositionRef.current.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 50 + 10) {
              gameOverRef.current = true // Столкновение с астероидом
              return false
            }

            return true
          })
      )
      if (gameOverRef.current) {
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    // Очищаем канвас
    context.clearRect(0, 0, 1200, 800)

    // Рисуем самолет
    context.fillStyle = '#ffffff'
    context.beginPath()
    context.arc(planePosition.x, planePosition.y, 50, 0, 2 * Math.PI)
    context.fill()

    // Рисуем астероиды
    context.fillStyle = '#ffffff'
    asteroids.forEach(pos => {
      context.beginPath()
      context.arc(pos.x, pos.y, 10, 0, 2 * Math.PI)
      context.fill()
    })
    // Рисуем пули
    context.fillStyle = '#00ff00' // Зеленый цвет для пуль
    bullets.forEach(pos => {
      context.beginPath()
      context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI)
      context.fill()
    })
  }, [planePosition, bullets, asteroids])

  return (
    <>
      <canvas
        ref={canvasRef}
        width="1200"
        height="800"
        style={{
          border: '1px solid black',
          background: '#000000',
        }}
      />
      <p
        style={{
          color: 'black',
          fontSize: '20px',
        }}>
        Score: {score}
      </p>
      {gameOverRef.current && (
        <p
          style={{
            color: 'red',
            fontSize: '30px',
          }}>
          Game Over!
        </p>
      )}
    </>
  )
}

export default Game
