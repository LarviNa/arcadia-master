import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Filter, Grid, List } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Comic } from '../context/CartContext'

const fallbackComics: Comic[] = [
  {
    id: '1',
    title: 'The Amazing Spider-Man #1',
    author: 'Stan Lee, Steve Ditko',
    price: 24.99,
    coverImage: 'https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=Spider-Man',
    description: 'The original first appearance of Spider-Man in this classic comic book.',
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
    coverImage: 'https://via.placeholder.com/300x450/1F2937/FFFFFF?text=Batman',
    description: 'A dark and gritty tale of an aging Batman coming out of retirement.',
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
    coverImage: 'https://via.placeholder.com/300x450/8B5CF6/FFFFFF?text=Saga',
    description: 'An epic space opera about two star-crossed lovers on the run.',
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
    coverImage: 'https://via.placeholder.com/300x450/EF4444/FFFFFF?text=Watchmen',
    description: 'A groundbreaking graphic novel about fallen superheroes.',
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
    coverImage: 'https://via.placeholder.com/300x450/10B981/FFFFFF?text=Maus',
    description: 'A powerful graphic novel about the Holocaust using animal characters.',
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
    coverImage: 'https://via.placeholder.com/300x450/6B7280/FFFFFF?text=TWD',
    description: 'The beginning of the zombie apocalypse survival story.',
    publisher: 'Image Comics',
    releaseDate: '2024-03-05',
    genre: 'Horror',
    pages: 144,
    language: 'English'
  }
]

const Home = () => {
  const { addToCart } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('title')

  const genres = ['all', 'Superhero', 'Sci-Fi', 'Horror', 'Historical', 'Fantasy']

  const [comicsData, setComicsData] = useState<Comic[]>(fallbackComics)

  useEffect(() => {
    fetch('http://localhost:8083/api/comics')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Map backend response to frontend Comic interface
        const mappedComics: Comic[] = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          title: item.titulo || 'Unknown Title',
          author: item.autor || 'Unknown Author',
          price: item.precio || 9.99,
          coverImage: `https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=${encodeURIComponent(item.titulo || 'Comic')}`,
          description: 'Comic cargado desde la API real de Arcadia.',
          publisher: item.editorial || 'Arcadia',
          releaseDate: '2024-01-01',
          genre: 'Superhero',
          pages: 32,
          language: 'Spanish'
        }));
        if (mappedComics.length > 0) {
          setComicsData(mappedComics);
        }
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
        // Fallback already set in state
      });
  }, []);

  const filteredAndSortedComics = comicsData
    .filter(comic => selectedGenre === 'all' || comic.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        default:
          return 0
      }
    })

  const ComicCard = ({ comic }: { comic: Comic }) => (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={comic.coverImage}
          alt={comic.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{comic.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{comic.author}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">${comic.price}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{comic.genre}</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/comic/${comic.id}`}
            className="flex-1 btn-secondary text-center text-sm py-2"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(comic)}
            className="btn-primary p-2"
            title="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const ComicListItem = ({ comic }: { comic: Comic }) => (
    <div className="card p-4 flex gap-4">
      <img
        src={comic.coverImage}
        alt={comic.title}
        className="w-24 h-32 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{comic.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{comic.author}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{comic.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary-600">${comic.price}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{comic.genre}</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/comic/${comic.id}`}
              className="btn-secondary text-sm py-2 px-4"
            >
              View Details
            </Link>
            <button
              onClick={() => addToCart(comic)}
              className="btn-primary p-2"
              title="Add to Cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Arcadia Comics</h1>
        <p className="text-xl mb-6 text-primary-100">
          Discover amazing stories from your favorite publishers
        </p>
        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
          Shop Now
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="title">Sort by Title</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="date">Newest First</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredAndSortedComics.length} of {comicsData.length} comics
        </p>
      </div>

      {/* Comics Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedComics.map(comic => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedComics.map(comic => (
            <ComicListItem key={comic.id} comic={comic} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedComics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No comics found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Home
