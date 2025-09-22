import { Link } from 'react-router-dom';
import  Button  from '../ui/Button';
import  Card  from '../ui/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center p-8">
        <div className="mb-6">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full">
              Go to Dashboard
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
