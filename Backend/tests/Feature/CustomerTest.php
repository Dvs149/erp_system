<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Customer;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    // ✅ Test customer list
    public function test_can_get_customers_list()
    {
        Sanctum::actingAs(User::factory()->create());

        Customer::factory()->count(3)->create();

        $response = $this->getJson('/api/customers');

        $response->assertStatus(200);
    }

    // ✅ Test create customer
    public function test_can_create_customer()
    {
        Sanctum::actingAs(User::factory()->create());

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1 9876543210',
        ];

        $response = $this->postJson('/api/customers', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('customers', [
            'email' => 'john@example.com',
        ]);
    }

    // ✅ Validation test
    public function test_customer_name_is_required()
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson('/api/customers', [
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors(['name']);
    }

    // ✅ Update customer
    public function test_can_update_customer()
    {
        Sanctum::actingAs(User::factory()->create());

        $customer = Customer::factory()->create();

        $response = $this->putJson("/api/customers/{$customer->id}", [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('customers', [
            'name' => 'Updated Name',
        ]);
    }

    // ✅ Delete customer
    public function test_can_delete_customer()
    {
        Sanctum::actingAs(User::factory()->create());

        $customer = Customer::factory()->create();

        $response = $this->deleteJson("/api/customers/{$customer->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('customers', [
            'id' => $customer->id,
        ]);
    }
}