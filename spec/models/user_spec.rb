require 'rails_helper'
require 'factory_girl_rails'

RSpec.describe User, type: :model do
  describe 'Create users' do
    it 'should create a User' do
      User.new(:name => 'Daniel Mockaitis', :username => 'dm1234', :password => 'secretword', :email => 'dm7@x.com').should be_valid
    end

    it 'should multiple user factory valid' do
      User.new(:name => 'Daniel Mockaitis', :username => 'dm1234', :password => 'secretword', :email => 'dm3@x.com').should be_valid
      User.new(:name => 'Daniel2 Mockaitis2', :username => 'dm12345', :password => 'secretword2', :email => 'dm2@x.com').should be_valid
    end

  end

  it 'Calling User.authenticate with a valid user/password combo returns a user' do
      alice = User.new(:username => 'alice', :password => 'greatest', :email => 'dm4@x.com', :name => 'alice')
      alice.save!
      User.authenticate('alice', 'greatest').should == alice
      alice.delete()
  end

  it 'Should replace User password if empty to password' do
    test = User.create(:username => 'another', :password => 'k', :email => 'another@me.com', :name => 'hey')
    test.password = ''
    test.save
    User.authenticate('another', 'password').should == test
  end

  it 'Should return false if user doesnt exist' do
    expect(User.authenticate?('none', 'work')).to eq(false)
  end

  it 'Should return true since user exists' do
    mark = User.new(:username => 'marky', :password => 'maaaark', :email => 'my@email.com', :name => 'mark')
    mark.save!
    expect(User.authenticate?('marky', 'maaaark')).to eq(true)
  end

end
