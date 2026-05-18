import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitLead, getListLeadsQueryKey, getGetLeadStatsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  vehicleYear: z.string().min(4, "Year required").max(4),
  vehicleMake: z.string().min(1, "Make is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  condition: z.enum(["excellent", "good", "fair", "poor", "junk"]),
  location: z.string().optional().or(z.literal("")),
  honeypot: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      condition: "fair",
      location: "",
      honeypot: "",
    },
  });

  const submitLead = useSubmitLead({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLeadStatsQueryKey() });
      },
    }
  });

  function onSubmit(values: FormValues) {
    if (values.honeypot) {
      // Spam detected, silently succeed
      setSubmitted(true);
      return;
    }
    submitLead.mutate({ data: values });
  }

  if (submitted) {
    return (
      <div className="bg-primary/10 border-2 border-primary p-8 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <h3 className="text-2xl font-bold uppercase tracking-tight">We'll contact you soon!</h3>
        <p className="text-muted-foreground font-medium">
          Expect a call from Mikiah with your cash offer.
        </p>
        <Button 
          variant="outline" 
          className="mt-4 border-2 font-bold" 
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          Submit another vehicle
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border-4 border-foreground shadow-md p-6 sm:p-8">
      <div className="mb-6 border-b-4 border-primary pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tight">Get your cash offer</h2>
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm mt-1">Takes 30 seconds</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="hidden">
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} tabIndex={-1} autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground bg-muted inline-block px-2 py-1">Contact Info</h3>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 555-5555" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email (Optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Pickup Address or City / Zip (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground bg-muted inline-block px-2 py-1">Vehicle Details</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="vehicleYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Year *</FormLabel>
                    <FormControl>
                      <Input placeholder="2005" maxLength={4} className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleMake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Make *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ford" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Model *</FormLabel>
                    <FormControl>
                      <Input placeholder="F-150" className="border-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Condition *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-2 focus:ring-primary focus:ring-offset-2">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Runs perfectly, looks great</SelectItem>
                      <SelectItem value="good">Good - Runs well, minor issues</SelectItem>
                      <SelectItem value="fair">Fair - Runs but needs work</SelectItem>
                      <SelectItem value="poor">Poor - Doesn't run or major damage</SelectItem>
                      <SelectItem value="junk">Junk - Scrap, totally totaled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-lg h-14 font-black uppercase tracking-wider shadow-sm transition-transform active:translate-y-1 active:shadow-none"
            disabled={submitLead.isPending}
          >
            {submitLead.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get My Cash Offer"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
