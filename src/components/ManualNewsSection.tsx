import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ManualNewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  created_at: string;
}

export const ManualNewsSection = () => {
  const [news, setNews] = useState<ManualNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchManualNews();
  }, []);

  const fetchManualNews = async () => {
    try {
      const { data, error } = await supabase
        .from('manual_news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités manuelles:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités manuelles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      const newsItem = {
        title: formData.title,
        content: formData.content,
        author: formData.author || 'Équipe Surf au Maroc',
        category: formData.category || 'Actualités',
        date: new Date().toISOString()
      };

      if (editingId) {
        const { error } = await supabase
          .from('manual_news')
          .update(newsItem)
          .eq('id', editingId);

        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Article modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from('manual_news')
          .insert([newsItem]);

        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Article ajouté avec succès",
        });
      }

      setFormData({ title: '', content: '', author: '', category: '' });
      setShowForm(false);
      setEditingId(null);
      fetchManualNews();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: ManualNewsItem) => {
    setFormData({
      title: item.title,
      content: item.content,
      author: item.author,
      category: item.category
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const { error } = await supabase
        .from('manual_news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Article supprimé avec succès",
      });
      
      fetchManualNews();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Articles Éditoriaux
        </h2>
        <Button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: '', content: '', author: '', category: '' });
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un article
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>
              {editingId ? 'Modifier l\'article' : 'Nouvel article'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Titre de l'article *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Auteur"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
                <Input
                  placeholder="Catégorie"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Contenu de l'article *"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Modifier' : 'Publier'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ title: '', content: '', author: '', category: '' });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {news.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">
              Aucun article éditorial pour le moment. Cliquez sur "Ajouter un article" pour commencer.
            </p>
          </CardContent>
        </Card>
      )}

      {news.map((article) => (
        <Card key={article.id} className="shadow-wave hover:shadow-ocean transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.date)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(article)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(article.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardTitle className="font-display text-xl leading-tight">
              {article.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground mb-4">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-1" />
              {article.author}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};