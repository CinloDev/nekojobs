import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplicationStatus } from '@/types';
import { Search } from 'lucide-react';

interface ApplicationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ApplicationStatus | 'Todos';
  onStatusChange: (status: ApplicationStatus | 'Todos') => void;
}

const statuses: (ApplicationStatus | 'Todos')[] = [
  'Todos', 'Guardada', 'Aplicada', 'Contactado', 'Entrevista RRHH', 
  'Entrevista técnica', 'Prueba técnica', 'Oferta', 'Rechazada', 'Ghosting'
];

export function ApplicationFilters({ searchQuery, onSearchChange, statusFilter, onStatusChange }: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar por empresa o puesto..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={statusFilter} onValueChange={(val) => onStatusChange(val as ApplicationStatus | 'Todos')}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
