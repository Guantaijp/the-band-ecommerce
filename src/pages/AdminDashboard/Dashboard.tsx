import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import {
    fetchProducts,
    deleteProduct,
    selectProducts,
} from '../../store/products/productSlice';
import {
    fetchCategories
} from '../../store/categories/categorySlice.ts';
import {AppDispatch} from "../../store";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    // const [ setIsEditMode] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / itemsPerPage));
    }, [products, itemsPerPage]);

    // Get current products
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);


    // Pagination component
    const Pagination = () => {
        return (
            <div className="flex items-center justify-between px-2 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, products.length)} of{' '}
                        {products.length} entries
                    </span>
                    <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                            setItemsPerPage(Number(value));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 per page</SelectItem>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="20">20 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    // Mock sales data for charts
    const salesData = [
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 5000 },
        { month: 'Apr', sales: 4500 },
        { month: 'May', sales: 6000 },
        { month: 'Jun', sales: 5500 },
    ];

    // Transform products data to show category distribution
    const inventoryData = products.reduce((acc, product) => {
        const categoryName = product.category?.name || 'Uncategorized';
        const existingCategory = (acc as any[]).find(item => item.name === categoryName);

        if (existingCategory) {
            (existingCategory as any).value += 1;
            (existingCategory as any).totalPrice += product.price;
        } else {
            (acc as any[]).push({
                name: categoryName,
                value: 1,
                totalPrice: product.price
            });
        }
        return acc;
    }, [] as any[]).map((category: any) => ({
        ...category,
        value: category.value,
        averagePrice: Math.round(category.totalPrice / category.value)
    }));


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const CustomTooltip = ({ active, payload }:any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 shadow-lg border rounded">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p>Products: {payload[0].value}</p>
                    <p>Avg Price: ${payload[0].payload.averagePrice}</p>
                </div>
            );
        }
        return null;
    };

    const handleDelete = (productId:any) => {
        dispatch(deleteProduct(productId));
        setIsDeleteDialogOpen(false);
    };

    const handleEdit = (product:any) => {
        setSelectedProduct(product);
        // setIsEditMode(true);
    };

    return (
        <div className="container mx-auto px-4 pt-24 space-y-16">
            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart width={500} height={300} data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                        </LineChart>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Distribution by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PieChart width={500} height={300}>
                            <Pie
                                data={inventoryData}
                                cx={250}
                                cy={150}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                                {inventoryData.map((index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </CardContent>
                </Card>
            </div>

            {/* Rest of the component remains the same */}
            {/* Product Management Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>${product.price}</TableCell>
                                        <TableCell>
                                            <div className="space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setIsDeleteDialogOpen(true);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination />
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => selectedProduct && handleDelete((selectedProduct as any).id)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Dashboard;