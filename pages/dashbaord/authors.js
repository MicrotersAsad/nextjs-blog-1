import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaImage, FaInfoCircle, FaLinkedin, FaTwitter, FaUser } from 'react-icons/fa';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    bio: '',
    image: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '' }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('/api/authors');
      setAuthors(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value }
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/authors', newAuthor);
      setAuthors([...authors, response.data]);
      setNewAuthor({ name: '', bio: '', image: '', socialLinks: { facebook: '', twitter: '', linkedin: '' } });
      toast.success('Author added successfully!');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to add author');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold mb-5">Manage Authors</h2>
        <div className="mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
           <FaUser className='inline fs-2'/>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newAuthor.name}
              onChange={handleChange}
              className="border p-2 ms-2 md:w-2/3 rounded-md"
            />
           </div>
           <div>
            <FaInfoCircle className='inline fs-2 info'/>
           <textarea
              type="text"
              name="bio"
              placeholder="Bio"
              value={newAuthor.bio}
              onChange={handleChange}
              className="border ms-2 p-2 md:w-2/3 rounded-md"
            />
           </div>
           <div>
            <FaImage className='inline fs-2'/>
           <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newAuthor.image}
              onChange={handleChange}
             className="border p-2 ms-2 md:w-2/3 rounded-md"
            />
           </div>
           <div>
           <FaFacebook className='inline fs-2'/>
           <input
              type="text"
              name="facebook"
              placeholder="Facebook URL"
              value={newAuthor.socialLinks.facebook}
              onChange={handleSocialChange}
              className="border p-2 ms-2 md:w-2/3 rounded-md"
            />
           </div>
          <div>
          <FaTwitter className='inline fs-2'/>
          <input
              type="text"
              name="twitter"
              placeholder="Twitter URL"
              value={newAuthor.socialLinks.twitter}
              onChange={handleSocialChange}
              className="border p-2 ms-2 md:w-2/3 rounded-md"
            />
          </div>
           <div>
           <FaLinkedin className='inline fs-2'/>
           <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={newAuthor.socialLinks.linkedin}
              onChange={handleSocialChange}
              className="border p-2 ms-2 md:w-2/3 rounded-md"
            />
           </div>
          
          </div>
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">
            Add Author
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authors.map((author) => (
            <div key={author._id} className="border p-4 rounded-lg shadow-md flex items-center space-x-4">
              <img src={author.image} alt={author.name} className="w-32 h-32 rounded-full" />
              <div>
                <p className="font-semibold text-lg">{author.name}</p>
                <p className="text-gray-600">{author.bio}</p>
                <div className="flex space-x-2 mt-2">
                  {author.socialLinks.facebook && (
                    <a href={author.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      <FaFacebook className='fs-3'/>
                    </a>
                  )}
                  {author.socialLinks.twitter && (
                    <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      <FaTwitter className='fs-3'/>
                    </a>
                  )}
                  {author.socialLinks.linkedin && (
                    <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                      <FaLinkedin className='fs-3'/>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Authors;
