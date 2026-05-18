import { Link } from "wouter";
import { AdminGate } from "@/components/admin-gate";
import { useListLeads, useGetLeadStats, useDeleteLead, getListLeadsQueryKey, getGetLeadStatsQueryKey } from "@workspace/api-client-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { 
  Trash2, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Flame, 
  ThermometerSun, 
  ThermometerSnowflake, 
  ArrowLeft,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}

function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data: leads, isLoading: loadingLeads } = useListLeads();
  const { data: stats, isLoading: loadingStats } = useGetLeadStats();
  
  const deleteLead = useDeleteLead({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLeadStatsQueryKey() });
      }
    }
  });

  const handleDelete = (id: number) => {
    deleteLead.mutate({ id });
  };

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'hot':
        return <span className="inline-flex items-center gap-1 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-black uppercase tracking-widest border-2 border-foreground shadow-2xs"><Flame className="w-3 h-3" /> Hot</span>;
      case 'warm':
        return <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 text-xs font-black uppercase tracking-widest border-2 border-foreground shadow-2xs"><ThermometerSun className="w-3 h-3" /> Warm</span>;
      case 'normal':
      default:
        return <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 text-xs font-black uppercase tracking-widest border-2 border-foreground shadow-2xs"><ThermometerSnowflake className="w-3 h-3" /> Normal</span>;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-orange-600';
      case 'junk': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-muted/30 pb-20">
      {/* Admin Header */}
      <header className="bg-foreground text-background py-4 px-4 sm:px-6 lg:px-8 border-b-4 border-primary sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="bg-background/10 p-2 hover:bg-background/20 transition-colors border border-background/20">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Leads Dashboard</h1>
              <p className="text-xs font-bold text-primary tracking-widest uppercase">Lehner's Cash For Cars</p>
            </div>
          </div>
          <div className="bg-background text-foreground font-black px-4 py-1 border-2 border-primary uppercase tracking-widest text-sm flex items-center gap-2 shadow-2xs">
            <Activity className="w-4 h-4 text-primary" /> Admin
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-black uppercase tracking-widest text-muted-foreground mb-4">Overview</h2>
          
          {loadingStats ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 border-2 border-foreground" />)}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard title="Total Leads" value={stats.total} />
              <StatCard title="Today" value={stats.today} highlight />
              <StatCard title="Hot Leads" value={stats.hot} icon={<Flame className="w-4 h-4 text-destructive" />} />
              <StatCard title="Warm Leads" value={stats.warm} icon={<ThermometerSun className="w-4 h-4 text-primary" />} />
              <StatCard title="Normal Leads" value={stats.normal} icon={<ThermometerSnowflake className="w-4 h-4 text-muted-foreground" />} />
            </div>
          ) : (
            <div className="bg-card border-2 border-destructive text-destructive p-4 font-bold uppercase text-sm">Failed to load stats</div>
          )}
        </section>

        {/* Leads List */}
        <section>
          <div className="flex justify-between items-end mb-4 border-b-2 border-border pb-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">All Leads</h2>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Newest First</div>
          </div>

          {loadingLeads ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 border-2 border-foreground" />)}
            </div>
          ) : leads && leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-card border-2 border-foreground shadow-sm flex flex-col md:flex-row overflow-hidden group">
                  
                  {/* Score Indicator Strip */}
                  <div className={`w-full md:w-3 shrink-0 ${lead.score === 'hot' ? 'bg-destructive' : lead.score === 'warm' ? 'bg-primary' : 'bg-muted-foreground'} h-2 md:h-auto`}></div>
                  
                  <div className="p-5 sm:p-6 flex-1 grid md:grid-cols-12 gap-6 items-start">
                    
                    {/* Header / Main Info */}
                    <div className="md:col-span-4 space-y-3">
                      <div className="flex items-center gap-2">
                        {getScoreBadge(lead.score)}
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          {format(new Date(lead.createdAt), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">{lead.fullName}</h3>
                        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 text-lg font-bold text-primary hover:underline mt-1 bg-primary/10 px-2 py-1 border border-primary/20">
                          <Phone className="w-4 h-4" /> {lead.phone}
                        </a>
                      </div>

                      {(lead.email || lead.location) && (
                        <div className="space-y-1 pt-2 border-t border-border">
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium">
                              <Mail className="w-4 h-4 shrink-0" /> <span className="truncate">{lead.email}</span>
                            </a>
                          )}
                          {lead.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                              <MapPin className="w-4 h-4 shrink-0" /> <span className="truncate">{lead.location}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Vehicle Info */}
                    <div className="md:col-span-7 bg-muted/50 border-2 border-foreground/10 p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-foreground text-background p-2 border-2 border-foreground/20">
                          <Car className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Vehicle</p>
                          <p className="text-xl font-black uppercase tracking-tight leading-none mt-1">
                            {lead.vehicleYear} {lead.vehicleMake} {lead.vehicleModel}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Condition</p>
                        <span className={`inline-block px-3 py-1 font-black uppercase tracking-widest text-sm border-2 border-current bg-background ${getConditionColor(lead.condition)}`}>
                          {lead.condition}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-1 flex md:flex-col justify-end items-end md:h-full pt-4 md:pt-0 border-t border-border md:border-t-0">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="border-2 border-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-4 border-foreground shadow-lg rounded-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-black uppercase tracking-tighter text-2xl">Delete this lead?</AlertDialogTitle>
                            <AlertDialogDescription className="font-medium text-lg">
                              This will permanently remove the lead for {lead.fullName}'s {lead.vehicleMake}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-bold uppercase tracking-wider border-2 border-foreground rounded-none">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(lead.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold uppercase tracking-wider border-2 border-destructive rounded-none"
                            >
                              Delete Lead
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border-4 border-dashed border-muted text-center py-20">
              <Car className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase tracking-widest text-muted-foreground">No leads yet</h3>
              <p className="text-muted-foreground mt-2 font-medium">When customers submit vehicles, they'll appear here.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

function StatCard({ title, value, icon, highlight = false }: { title: string, value: number, icon?: React.ReactNode, highlight?: boolean }) {
  return (
    <div className={`p-4 border-2 shadow-sm ${highlight ? 'bg-primary border-foreground text-foreground' : 'bg-card border-foreground/20'}`}>
      <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? 'text-foreground/80' : 'text-muted-foreground'}`}>
        {icon}
        {title}
      </div>
      <div className="text-4xl font-black leading-none">{value}</div>
    </div>
  );
}
