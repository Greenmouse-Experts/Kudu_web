import StatCard from "../../../../components/StatsCard";

const DashboardStats = ({users, products}) => {
    return (
        <div className="flex w-full flex-col md:flex-row gap-5">
            <StatCard
                number={users}
                label="Total Users"
                growth="3.1%"
                iconColor="bg-orange-200"
                IconComponent={
                    <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737203300/kuduMart/1_vvqwpc.png"
                        alt="Users"
                        className="w-[200px]"
                    />
                }
            />
            <StatCard
                number="N20M"
                label="Total Sales"
                growth="3.1%"
                iconColor="bg-orange-200"
                IconComponent={
                    <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737203300/kuduMart/Group_otlfj2.png"
                        alt="Sales"
                        className="w-[200px]"
                    />
                }
            />
            <StatCard
                number={products}
                label="Total Products"
                growth="3.1%"
                iconColor="bg-orange-200"
                IconComponent={
                    <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737203300/kuduMart/Group_1321314864_bu3ohe.png"
                        alt="Products"
                        className="w-[100px]"
                    />
                }
            />
            <StatCard
                number={1203}
                label="Total Orders"
                growth="3.1%"
                iconColor="bg-orange-200"
                IconComponent={
                    <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737203300/kuduMart/Group_1321314865_pgn6f5.png"
                        alt="Orders"
                        className="w-[200px]"
                    />
                }
            />
        </div>

    );
};

export default DashboardStats;