import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';

const ReviewTable = ({ reviews, onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // If no reviews, return null
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Get column headers from the first review
  const columns = Object.keys(reviews[0]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Limit pagination items to show
  const maxPaginationItems = 5;
  let visiblePaginationItems = paginationItems;
  
  if (paginationItems.length > maxPaginationItems) {
    const startIndex = Math.max(0, currentPage - Math.floor(maxPaginationItems / 2) - 1);
    const endIndex = Math.min(paginationItems.length, startIndex + maxPaginationItems);
    visiblePaginationItems = paginationItems.slice(startIndex, endIndex);
    
    // Add first and last page buttons if needed
    if (startIndex > 0) {
      visiblePaginationItems = [
        <Pagination.First key="first" onClick={() => handlePageChange(1)} />,
        <Pagination.Ellipsis key="ellipsis-start" />,
        ...visiblePaginationItems
      ];
    }
    
    if (endIndex < paginationItems.length) {
      visiblePaginationItems = [
        ...visiblePaginationItems,
        <Pagination.Ellipsis key="ellipsis-end" />,
        <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} />
      ];
    }
  }

  return (
    <div className="results-container">
      <h2>Review Results</h2>
      <p>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, reviews.length)} of {reviews.length} reviews</p>
      
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((review, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column === 'content' && review[column] ? 
                      review[column].length > 100 ? 
                        `${review[column].substring(0, 100)}...` : 
                        review[column]
                      : review[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination>
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {visiblePaginationItems}
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
      
      <Button 
        variant="success" 
        onClick={onDownload}
        className="mt-3"
      >
        Download CSV
      </Button>
    </div>
  );
};

export default ReviewTable;
