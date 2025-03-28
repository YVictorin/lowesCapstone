import { useState, useEffect } from "react"

// Import clothes images
import ShirtImage from "../../../../assets/images/clothes-shirt.svg"
import PantsImage from "../../../../assets/images/clothes-pants.svg"
import HatImage from "../../../../assets/images/clothes-hat.svg"
import PajamasImage from "../../../../assets/images/pajamas.png"
import SocksImage from "../../../../assets/images/clothes-socks.svg"
import ShoesImage from "../../../../assets/images/clothes-shoes.svg"
import JacketImage from "../../../../assets/images/clothes-jacket.svg"
import ScarfImage from "../../../../assets/images/clothes-scarf.svg"
import PajamasFoundImage from "../../../../assets/images/pajamas.png"

export default function ChangeClothesGame({ onCompleteTask }) {
  const [pajamasFound, setPajamasFound] = useState(false)
  const [clothesItems, setClothesItems] = useState([])
  
  // Map clothes types to their imported images
  const clothesImages = {
    "shirt": ShirtImage,
    "pants": PantsImage,
    "hat": HatImage,
    "pajamas": PajamasImage,
    "socks": SocksImage,
    "shoes": ShoesImage,
    "jacket": JacketImage,
    "scarf": ScarfImage
  }

  // Initialize clothes items
  useEffect(() => {
    // Create clothes items
    const items = []
    const types = ["shirt", "pants", "hat", "pajamas", "socks", "shoes", "jacket", "scarf"]

    for (let i = 0; i < 8; i++) {
      items.push({
        id: i,
        type: types[i],
        isPajamas: types[i] === "pajamas",
        flipped: false,
        matched: false,
      })
    }

    // Shuffle positions
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = items[i]
      items[i] = items[j]
      items[j] = temp
    }

    setClothesItems(items)
  }, [])

  const handleClothesClick = (id) => {
    // Find the clicked item
    const clickedItem = clothesItems.find((item) => item.id === id)
    if (!clickedItem || clickedItem.matched) return

    // Flip the item
    setClothesItems((prev) => prev.map((item) => (item.id === id ? { ...item, flipped: true } : item)))

    // Check if it's pajamas
    if (clickedItem.isPajamas) {
      setPajamasFound(true)
      setTimeout(onCompleteTask, 1000)
    } else {
      // Not pajamas, flip back after a delay
      setTimeout(() => {
        setClothesItems((prev) => prev.map((item) => (item.id === id ? { ...item, flipped: false } : item)))
      }, 1000)
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* <div className="absolute text-center w-full bottom-2 text-indigo-200 text-sm">
        Find your pajamas among the clothes!
      </div> */}

      {/* Clothes grid */}
      <div className="grid grid-cols-4 gap-2 p-4 h-full">
        {clothesItems.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
              item.flipped ? "bg-indigo-600" : "bg-indigo-800 hover:bg-indigo-700"
            }`}
            onClick={() => handleClothesClick(item.id)}
          >
            {item.flipped ? (
              <img
                src={clothesImages[item.type]}
                alt={item.type}
                className="w-12 h-12 object-contain"
                style={{ filter: `hue-rotate(${item.id * 30}deg)` }}
                onError={(e) => {
                  console.error(`Failed to load image for ${item.type}`)
                  e.target.onerror = null;
                  e.target.src = `/placeholder.svg?height=48&width=48&text=${item.type}`
                }}
              />
            ) : (
              <span className="text-indigo-300 text-2xl">?</span>
            )}
          </div>
        ))}
      </div>

      {/* Found pajamas message */}
      {pajamasFound && (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-900 bg-opacity-80">
          <div className="bg-indigo-800 p-4 rounded-lg shadow-md text-center">
            <p className="text-indigo-100 font-bold text-xl mb-2">Pajamas Found!</p>
            <img
              src={PajamasFoundImage}
              alt="Pajamas"
              className="w-16 h-16 mx-auto my-2"
              style={{ filter: "hue-rotate(200deg)" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}