import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "../icon/PlusIcon";
import { VerticalDotsIcon } from "../icon/VerticalDotsIcon";
import { SearchIcon } from "../icon/SearchIcon";
import { ChevronDownIcon } from "../icon/ChevronDownIcon";
import { capitalize } from "./utils";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../icon/EditIcon";
import { DeleteIcon } from "../icon/DeleteIcon";

export default function TableData({ columns, users, statusOptions, INITIAL_VISIBLE_COLUMNS }) {
    const navigate = useNavigate()
    const personIndex = INITIAL_VISIBLE_COLUMNS.includes("personal_number");
    const supportIndex = INITIAL_VISIBLE_COLUMNS.includes("name");

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: INITIAL_VISIBLE_COLUMNS[0],
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {

            if (personIndex) {
                filteredUsers = filteredUsers.filter((user) =>
                    user.personal_number.toLowerCase().includes(filterValue.toLowerCase()) ||
                    user.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(filterValue.toLowerCase()),
                );

            }
            else if (supportIndex) {
                filteredUsers = filteredUsers.filter((user) =>
                    user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    user.support_receiver.toLowerCase().includes(filterValue.toLowerCase()) ||
                    user.support_receiver_name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    user.support_receiver_surname.toLowerCase().includes(filterValue.toLowerCase()),
                );
            }
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            if (personIndex) {
                filteredUsers = filteredUsers.filter((user) =>
                    Array.from(statusFilter).includes(user.person_status),
                );
            }
            else if (supportIndex) {
                filteredUsers = filteredUsers.filter((user) =>
                    Array.from(statusFilter).includes(user.support_date),
                );
            }
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        if (personIndex) {
            switch (columnKey) {
                case "actions":
                    return (
                        <div className="relative flex justify-start items-center gap-2">
                            <Tooltip placement="top" content="แก้ไข">
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={() => { navigate(`/disabledperson/data/${user.personal_number}`) }} >
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip placement="top" content="ลบ">
                                <span className="text-lg cursor-pointer active:opacity-50 text-danger-600">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        }
        else if (supportIndex) {
            switch (columnKey) {
                case "actions":
                    return (
                        <div className="relative flex justify-start items-center gap-2">
                            <Tooltip placement="top" content="แก้ไข">
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={() => { navigate(`/disabledperson/support/edit/${user.name}`) }} >
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip placement="top" content="ลบ">
                                <span className="text-lg cursor-pointer active:opacity-50 text-danger-600">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        }

    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%] md:max-w-[90%]"
                        placeholder="ค้นหา..."
                        variant="bordered"
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    ตัวกรอง
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    คอลัมน์
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusIcon />}>
                            เพิ่มผู้พิการ
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">ทั้งหมด {users.length} รายการ</span>
                    <label className="flex items-center text-default-400 text-small">
                        จำนวนแถวต่อหน้า:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} จาก ${filteredItems.length} ที่เลือก`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        ก่อนหน้า
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        ต่อไป
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            {personIndex && (
                <TableBody emptyContent={"No users found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.personal_number}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            )}
            {supportIndex && (
                <TableBody emptyContent={"No users found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            )}

        </Table>
    );
}
