import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  full_name: string;
  course: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [newReview, setNewReview] = useState({
    course: '',
    rating: 5,
    review_text: ''
  });

  // Fetch reviews from database
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const getUserFullName = async (): Promise<string> => {
    if (!user) return 'Anonymous';

    try {
      // First try to get full name from enrollments table using email
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('full_name')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!enrollmentError && enrollment?.full_name) {
        console.log('Found name from enrollments:', enrollment.full_name);
        return enrollment.full_name;
      }

      // Then try from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (!profileError && profile?.full_name) {
        console.log('Found name from profiles:', profile.full_name);
        return profile.full_name;
      }

      // Last resort: try from user metadata
      if (user.user_metadata?.full_name) {
        console.log('Found name from user metadata:', user.user_metadata.full_name);
        return user.user_metadata.full_name;
      }

      console.log('No full name found, using Anonymous');
      return 'Anonymous';
    } catch (error) {
      console.error('Error getting user full name:', error);
      return 'Anonymous';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.course || !newReview.review_text) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const fullName = await getUserFullName();
      console.log('Submitting review with full name:', fullName);

      const { error } = await supabase
        .from('reviews')
        .insert([{
          user_id: user.id,
          full_name: fullName,
          course: newReview.course,
          rating: newReview.rating,
          review_text: newReview.review_text
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your review has been submitted successfully",
      });

      setNewReview({ course: '', rating: 5, review_text: '' });
      setShowForm(false);
      
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <section id="reviews" className="py-24 bg-slate-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 px-4">
            Student{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto mb-10 px-4">
            Read what our students say about their learning experience at Atharva Computer Institute and how our certified courses helped them advance their careers.
          </p>
          
          {isAuthenticated ? (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 text-lg px-8 py-3 rounded-full"
            >
              Write a Review
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = '/auth'}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 text-lg px-8 py-3 rounded-full"
            >
              Sign In to Write a Review
            </Button>
          )}
        </div>

        {showForm && isAuthenticated && (
          <Card className="max-w-3xl mx-auto mb-16 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Write Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-slate-300 mb-3">
                    Course
                  </label>
                  <Input
                    type="text"
                    value={newReview.course}
                    onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white text-base py-3"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-base font-medium text-slate-300 mb-3">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer ${
                          star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-base font-medium text-slate-300 mb-3">
                    Your Review
                  </label>
                  <Textarea
                    value={newReview.review_text}
                    onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white text-base"
                    rows={5}
                    placeholder="Share your experience with Atharva Computer Institute..."
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 text-lg px-8 py-3"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 text-lg px-8 py-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center text-slate-300">Loading reviews...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    {renderStars(review.rating)}
                    <span className="text-base text-slate-400 ml-2">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 mb-6 italic text-lg leading-relaxed">
                    "{review.review_text}"
                  </p>
                  
                  <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-white font-semibold text-lg">{review.full_name}</h4>
                    <p className="text-blue-400 text-base">{review.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-full text-center text-slate-300 text-lg">
                No reviews yet. Be the first to write one!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
