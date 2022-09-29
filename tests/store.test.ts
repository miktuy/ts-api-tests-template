import {strict as assert} from 'assert';
import {definitions} from "../.temp/types";
import {ApiClient} from "../api/client";

describe('Store', () => {
  it('should return his inventory and correctly updates statuses', async function() {
    const authorizedClient = await ApiClient.loginAs({username: 'admin', password: 'admin'})
    const inventory = await authorizedClient.store.getInventory();
    assert(Object.keys(inventory).length > 0,
      'Inventory list should not be empty');

    await authorizedClient.pet.addNew(petWithStatus('available'));
    const inventoryWithAvailableAdded = await authorizedClient.store.getInventory();
    assert.equal(
      inventoryWithAvailableAdded.available,
      inventory.available + 1,
      'Available value in inventory should be increased by 1'
    );

    await authorizedClient.pet.addNew(petWithStatus('pending'));
    const inventoryWithPendingAdded = await authorizedClient.store.getInventory();
    assert.equal(
      inventoryWithPendingAdded.pending,
      inventory.pending + 1,
      'Pending value in inventory should be increased by 1'
    );

    await authorizedClient.pet.addNew(petWithStatus('sold'));
    const inventoryWithSoldAdded = await authorizedClient.store.getInventory();
    assert.equal(
      inventoryWithSoldAdded.sold,
      inventory.sold + 1,
      'Sold value in inventory should be increased by 1'
    );
  })

  it('allows to place order by user and admin can see created order', async function () {
    const userClient = await ApiClient.loginAs({username: 'user', password: 'user'});
    const order: Omit<definitions['Order'], 'id'> = {
      petId: 1,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed'
    };
    const placedOrder = await userClient.store.placeOrder(order);

    const adminClient = await ApiClient.loginAs({username: 'admin', password: 'admin'});
    await adminClient.store.getOrderById(placedOrder.id);
  })
})

function petWithStatus(status: definitions['Pet']['status']) {
  return {
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "Cat",
    "photoUrls": [
      "http://test.com/image.jpg"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    status
  }
}