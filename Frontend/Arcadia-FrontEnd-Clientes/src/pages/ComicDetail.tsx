import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Star, Calendar, BookOpen, Globe } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Comic } from '../context/CartContext'

const mockComics: Comic[] = [
  {
    id: '1',
    title: 'The Amazing Spider-Man #1',
    author: 'Stan Lee, Steve Ditko',
    price: 24.99,
    coverImage: 'https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=Spider-Man',
    description: 'The original first appearance of Spider-Man in this classic comic book. This issue marks the beginning of Peter Parker\'s journey as the friendly neighborhood Spider-Man. A must-have for any comic book collector!',
    publisher: 'Marvel Comics',
    releaseDate: '2024-01-15',
    genre: 'Superhero',
    pages: 32,
    language: 'English'
  },
  {
    id: '2',
    title: 'Batman: The Dark Knight Returns',
    author: 'Frank Miller',
    price: 29.99,
    coverImage: 'https://via.placeholder.com/400x600/1F2937/FFFFFF?text=Batman',
    description: 'A dark and gritty tale of an aging Batman coming out of retirement. Frank Miller\'s masterpiece redefined the superhero genre and remains one of the most influential Batman stories ever told.',
    publisher: 'DC Comics',
    releaseDate: '2024-02-20',
    genre: 'Superhero',
    pages: 120,
    language: 'English'
  },
  {
    id: '3',
    title: 'Saga Vol. 1',
    author: 'Brian K. Vaughan, Fiona Staples',
    price: 19.99,
    coverImage: 'https://via.placeholder.com/400x600/8B5CF6/FFFFFF?text=Saga',
    description: 'An epic space opera about two star-crossed lovers on the run from a galactic war. This award-winning series combines fantasy and science fiction in a unique and compelling way.',
    publisher: 'Image Comics',
    releaseDate: '2024-03-10',
    genre: 'Sci-Fi',
    pages: 160,
    language: 'English'
  },
  {
    id: '4',
    title: 'Watchmen',
    author: 'Alan Moore, Dave Gibbons',
    price: 34.99,
    coverImage: 'https://via.placeholder.com/400x600/EF4444/FFFFFF?text=Watchmen',
    description: 'A groundbreaking graphic novel about fallen superheroes. Alan Moore\'s deconstruction of the superhero genre explores themes of power, morality, and the human condition.',
    publisher: 'DC Comics',
    releaseDate: '2024-01-25',
    genre: 'Superhero',
    pages: 384,
    language: 'English'
  },
  {
    id: '5',
    title: 'Maus: A Survivor\'s Tale',
    author: 'Art Spiegelman',
    price: 22.99,
    coverImage: 'https://via.placeholder.com/400x600/10B981/FFFFFF?text=Maus',
    description: 'A powerful graphic novel about the Holocaust using animal characters. This Pulitzer Prize-winning work tells the story of Vladek Spiegelman\'s survival during World War II.',
    publisher: 'Pantheon Books',
    releaseDate: '2024-02-15',
    genre: 'Historical',
    pages: 296,
    language: 'English'
  },
  {
    id: '6',
    title: 'The Walking Dead Vol. 1',
    author: 'Robert Kirkman, Tony Moore',
    price: 17.99,
    coverImage: 'https://via.placeholder.com/400x600/6B7280/FFFFFF?text=TWD',
    description: 'The beginning of the zombie apocalypse survival story. Rick Grimes wakes up in a hospital to find the world overrun by the undead in this gripping horror series.',
    publisher: 'Image Comics',
    releaseDate: '2024-03-05',
    genre: 'Horror',
    pages: 144,
    language: 'English'
  }
]

const ComicDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  
  const comic = mockComics.find(c => c.id === id)

  if (!comic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Comic not found</h1>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">{comic.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Comic Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={comic.coverImage}
              alt={comic.title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg aspect-[3/4] flex items-center justify-center text-gray-500 text-sm">
                Preview {i}
              </div>
            ))}
          </div>
        </div>

        {/* Comic Details */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{comic.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {comic.author}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-primary-600">${comic.price}</span>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="ml-1 text-gray-600">4.8 (124 reviews)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{comic.description}</p>
          </div>

          {/* Comic Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Comic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Publisher</p>
                  <p className="font-medium">{comic.publisher}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Release Date</p>
                  <p className="font-medium">{new Date(comic.releaseDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                  {comic.genre[0]}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="font-medium">{comic.genre}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                  #
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-medium">{comic.pages}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-medium">{comic.language}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(comic)}
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            
            <Link
              to="/"
              className="btn-secondary flex items-center gap-2 px-6"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Link>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Brand new condition</li>
              <li>• Official licensed merchandise</li>
              <li>• Ships within 2-3 business days</li>
              <li>• Free shipping on orders over $50</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComicDetail
