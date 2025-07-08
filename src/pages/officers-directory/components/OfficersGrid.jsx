import React from 'react';
import OfficerCard from './OfficerCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfficersGrid = ({ 
  officers, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange, 
  viewMode = 'grid' 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Icon name="Loader2" size={32} className="text-primary mx-auto" />
          </div>
          <p className="text-text-secondary font-body">Loading officers...</p>
        </div>
      </div>
    );
  }

  if (officers.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          No Officers Found
        </h3>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          No officers match your current search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary font-body">
          Showing {officers.length} officers
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </p>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            onClick={() => {}}
            className="p-2"
            title="Grid View"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            onClick={() => {}}
            className="p-2"
            title="List View"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>

      {/* Officers Grid */}
      <div className={`
        ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
        }
      `}>
        {officers.map((officer) => (
          <OfficerCard 
            key={officer.id} 
            officer={officer}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'primary' : 'ghost'}
                  onClick={() => onPageChange(pageNum)}
                  className="w-10 h-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}

      {/* Load More Option */}
      <div className="text-center pt-4">
        <Button
          variant="ghost"
          onClick={() => {}}
          iconName="MoreHorizontal"
        >
          Load More Officers
        </Button>
      </div>
    </div>
  );
};

export default OfficersGrid;