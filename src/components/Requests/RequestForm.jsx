
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { requestService, facilityService, helperService } from '../../services/api';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    facilityId: '',
    severityId: ''
  });
  
  const [facilities, setFacilities] = useState([]);
  const [severityLevels, setSeverityLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Load facilities and severity levels
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilitiesData = await facilityService.getAll();
        const severityData = await helperService.getSeverityLevels();
        
        setFacilities(facilitiesData);
        setSeverityLevels(severityData);
        
        // Set default values if available
        if (facilitiesData.length > 0) {
          setFormData(prev => ({ ...prev, facilityId: facilitiesData[0].id }));
        }
        if (severityData.length > 0) {
          setFormData(prev => ({ ...prev, severityId: severityData[0].id }));
        }
      } catch (err) {
        console.error('Error loading form data:', err);
        setError('Failed to load form data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'facilityId' || name === 'severityId' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.facilityId || !formData.severityId) {
      setError('All fields are required');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      const requestData = {
        ...formData,
        createdBy: currentUser.id
      };
      
      const createdRequest = await requestService.createRequest(requestData);
      
      // In a real app, this would trigger an email notification
      console.log('Request created:', createdRequest);
      console.log('Would send email to user and facility head');
      
      // Redirect to the requests list
      navigate('/requests/my');
    } catch (err) {
      console.error('Error creating request:', err);
      setError('Failed to create request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-6">Loading form...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Service Request</h1>
        
        <div className="card">
          {error && (
            <div className="bg-error bg-opacity-10 text-error p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Request Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title for your request"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="facility">Facility</label>
              <select
                id="facility"
                name="facilityId"
                className="form-select"
                value={formData.facilityId}
                onChange={handleChange}
                required
              >
                <option value="">Select Facility</option>
                {facilities.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="severity">Severity Level</label>
              <select
                id="severity"
                name="severityId"
                className="form-select"
                value={formData.severityId}
                onChange={handleChange}
                required
              >
                <option value="">Select Severity</option>
                {severityLevels.map(severity => (
                  <option key={severity.id} value={severity.id}>
                    {severity.name} - {severity.description}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the issue"
                required
              />
              <small className="text-gray-500">Please provide as much detail as possible</small>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/requests/my')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
