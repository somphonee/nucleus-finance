import { useState } from "react";
import { Plus, Pencil, Trash2, Download, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Organization {
  id: string;
  code: string;
  name: string;
  province: string;
  address: string;
  phone: string;
  email: string;
  memberCount: number;
  isActive: boolean;
}

const mockOrganizations: Organization[] = [
  {
    id: "1",
    code: "ORG-VTE",
    name: "Vientiane Capital Office",
    province: "Vientiane Capital",
    address: "Main Street, Chanthabouly District",
    phone: "+856 21 123456",
    email: "vte@example.la",
    memberCount: 1250,
    isActive: true,
  },
  {
    id: "2",
    code: "ORG-LPB",
    name: "Luang Prabang Office",
    province: "Luang Prabang",
    address: "Heritage Avenue, Luang Prabang",
    phone: "+856 71 234567",
    email: "lpb@example.la",
    memberCount: 890,
    isActive: true,
  },
  {
    id: "3",
    code: "ORG-SVK",
    name: "Savannakhet Office",
    province: "Savannakhet",
    address: "Commercial Road, Savannakhet",
    phone: "+856 41 345678",
    email: "svk@example.la",
    memberCount: 1050,
    isActive: true,
  },
  {
    id: "4",
    code: "ORG-CPV",
    name: "Champasak Office",
    province: "Champasak",
    address: "Provincial Center, Pakse",
    phone: "+856 31 456789",
    email: "cpv@example.la",
    memberCount: 780,
    isActive: true,
  },
];

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    province: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleAdd = () => {
    const newOrg: Organization = {
      id: Date.now().toString(),
      ...formData,
      memberCount: 0,
      isActive: true,
    };
    setOrganizations([...organizations, newOrg]);
    setIsDialogOpen(false);
    resetForm();
    toast({ title: "Success", description: "Organization added successfully" });
  };

  const handleEdit = (org: Organization) => {
    setEditingOrg(org);
    setFormData({
      code: org.code,
      name: org.name,
      province: org.province,
      address: org.address,
      phone: org.phone,
      email: org.email,
    });
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingOrg) {
      setOrganizations(organizations.map(org =>
        org.id === editingOrg.id ? { ...org, ...formData } : org
      ));
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Success", description: "Organization updated successfully" });
    }
  };

  const handleDelete = (id: string) => {
    setOrganizations(organizations.filter(org => org.id !== id));
    toast({ title: "Success", description: "Organization deleted successfully" });
  };

  const resetForm = () => {
    setFormData({ code: "", name: "", province: "", address: "", phone: "", email: "" });
    setEditingOrg(null);
  };

  const totalMembers = organizations.reduce((sum, org) => sum + org.memberCount, 0);
  const activeOrgs = organizations.filter(org => org.isActive).length;

  // Pagination
  const totalPages = Math.ceil(organizations.length / itemsPerPage);
  const paginatedOrgs = organizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Organizations & Provinces</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage provincial offices and organizations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => toast({ title: "Exporting", description: "Exporting organizations..." })}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Total Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{organizations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{activeOrgs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{totalMembers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Members/Org</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {organizations.length > 0 ? Math.round(totalMembers / organizations.length) : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Province</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-mono text-sm">{org.code}</TableCell>
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell>{org.province}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{org.phone}</div>
                        <div className="text-muted-foreground">{org.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{org.memberCount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={org.isActive ? "default" : "secondary"}>
                        {org.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(org)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(org.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingOrg ? "Edit Organization" : "Add New Organization"}</DialogTitle>
            <DialogDescription>
              {editingOrg ? "Update organization details" : "Create a new provincial office or organization"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Organization Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., ORG-VTE"
                />
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  placeholder="e.g., Vientiane Capital"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Vientiane Capital Office"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full address"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+856 21 123456"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="office@example.la"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editingOrg ? handleUpdate : handleAdd}>
              {editingOrg ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Organizations;
