
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2Icon, ArrowRight } from "lucide-react";
import { EquipmentIcon } from "./EquipmentIcon";
import { StatusBadge } from "./StatusBadge";

interface Equipment {
  id: number;
  name: string;
  type: string;
  site: string;
  status: 'online' | 'offline' | 'warning';
  ip: string;
  lastMaintenance: string;
}

interface EquipmentTableProps {
  equipment: Equipment[];
}

export const EquipmentTable = ({ equipment }: EquipmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableHead className="font-semibold text-foreground">Équipement</TableHead>
          <TableHead className="font-semibold text-foreground">Type</TableHead>
          <TableHead className="font-semibold text-foreground">Site</TableHead>
          <TableHead className="font-semibold text-foreground">Statut</TableHead>
          <TableHead className="font-semibold text-foreground">IP</TableHead>
          <TableHead className="font-semibold text-foreground">Maintenance</TableHead>
          <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipment.map((item) => (
          <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <EquipmentIcon type={item.type} />
                </div>
                <span className="text-foreground">{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="capitalize text-muted-foreground">{item.type}</TableCell>
            <TableCell className="text-muted-foreground">{item.site}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">{item.ip}</TableCell>
            <TableCell className="text-muted-foreground">{item.lastMaintenance}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Link to={`/equipements/${item.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/10 hover:text-primary">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-lg hover:bg-danger/10 hover:text-danger">
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
