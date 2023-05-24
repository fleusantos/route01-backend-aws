from fastapi import APIRouter

router = APIRouter()
# have to finish
@router.get("/items")
async def get_items():
    return {"message": "Get all items"}

@router.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"message": f"Get item with ID {item_id}"}
