// pages/index.js
import React, { useState, useEffect , useCallback} from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard'; // Import the ImageCard component
import { debounce } from 'lodash';
import { Paginator } from '../components/Paginator';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(1000);
  const [pageSize, setPageSize] = useState(30)
 

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const delayedFetchData = debounce(searchData, 500);
      delayedFetchData()
      return delayedFetchData.cancel
    } else {
      fetchData();
    }
  }, [searchTerm, currentPage]); // Run useEffect whenever searchTerm changes

  const handleCurrentPage = (val) => {
    setCurrentPage(val);
   
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          per_page: 50,
          page:currentPage,
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY, // Replace 'your_unsplash_access_key' with your actual Unsplash access key
          query: searchTerm // Include the search term in the API request
        }
      });
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchData = useCallback(async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          per_page: 30,
          page:currentPage,
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,  // Replace 'your_unsplash_access_key' with your actual Unsplash access key
          query: searchTerm // Include the search term in the API request
        }
      });
      setPhotos(response.data.results);
      setTotalRows(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [searchTerm, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Image Filter App</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos && photos.map((photo) => (
          <ImageCard key={photo.id} imageUrl={photo.urls.thumb} altDescription={photo.alt_description} />
        ))}
      </div>

      <div className='my-6 mx-auto'>
        <Paginator setPage={handleCurrentPage} page={currentPage} pageSize={pageSize} totalRows={searchTerm !== "" ? totalRows : 1000} />

      </div>
    </div>
  );
}
