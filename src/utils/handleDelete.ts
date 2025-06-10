export const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }
  
      alert(`Item with ID ${id} deleted successfully!`);
      return response.json();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting the item. Please try again.");
    }
  };
  