/** Node: node for a singly linked list. */
class Node {
   constructor(val) {
      this.val = val;
      this.next = null;
   }
}

/** LinkedList: chained together nodes. */
class LinkedList {
   constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.length = 0;

      for (let val of vals) this.push(val);
   }

   /** push(val): add new value to END of list. */
   push(val) {
      let newNode = new Node(val);
      //check if the list is empty
      if (!this.head) {
         this.head = newNode;
         this.tail = newNode;
      } else {
         //if the list is NOT empty
         this.tail.next = newNode; //makes the tail.next = the new val
         this.tail = newNode; //then updates the tail (for future use) to be that new val
      }

      this.length += 1; //++ returns the value prior to incrementing | += returns the new value
   }

   /** unshift(val): add new value to START of list. */
   unshift(val) {
      let newNode = new Node(val);

      if (!this.head) {
         this.head = newNode;
         this.tail = newNode;
      } else {
         let currentHead = this.head; //capturing the currentHead before changing it to the newNode
         this.head = newNode;
         this.head.next = currentHead; //adding that previously captured head as the .next of the newNode
      }
      this.length += 1;
   }

   // get the Node at index (i) | head is index 0
   getNode(i) {
      let currentNode = this.head; // getNode(0) | 0 != null && 0 != 0 | immediately returns the head because count (0) is equal to getNode(0)
      let count = 0;

      while (currentNode !== null && count != i) {
         count += 1; // counts until it is at the input value (i)
         currentNode = currentNode.next; //setting the value for the next run through of the loop
      }
      return currentNode;
   }

   /** removeAt(idx): return & remove item at idx, */
   removeAt(idx) {
      //Error for an index that does not exist in the current list
      if (idx >= this.length || idx < 0) {
         throw new Error('Not a valid index!');
      }

      let previousNode = this.getNode(idx - 1); //getNode(1) would be this.head | getNode head is index 0 instead of Node 1

      //Checking if the idx is the head
      if (idx === 0) {
         console.log('we got the head');
         let currentVal = this.head.val;
         this.head = this.head.next;
         this.length -= 1;

         return currentVal;
      }

      //Checking if the idx is the tail
      if (idx === this.length - 1) {
         console.log('we got the tail');
         let currentVal = previousNode.next.val;

         previousNode.next = null;
         this.tail = previousNode;
         this.length -= 1;

         return currentVal;
      }
      //Below is the normal use case (not head or tail or invalid)
      let currentVal = previousNode.next.val; //ACTUAL (idx) val | got the previous first because we don't have easy access to prev, but we have .next
      previousNode.next = previousNode.next.next; //prev.next is currentVal | so prev.next.next is currentVal.next
      //NOTE: the node that prev.next (currentVal) used to point to is now unreferenced, and thus it’s effectively removed from the list
      this.length -= 1;

      return currentVal;
   }

   /** pop(): return & remove LAST item. */
   pop() {
      this.removeAt(this.length - 1);
   }

   /** shift(): return & remove FIRST item. */
   shift() {
      this.removeAt(0);
   }

   /** getAt(idx): get val at idx. */
   getAt(idx) {
      if (idx >= this.length || idx < 0) {
         throw new Error('Not a valid index!');
      }
      let currentVal = this.getNode(idx).val;

      return currentVal;
   }

   /** setAt(idx, val): set val at idx to val */
   setAt(idx, val) {
      if (idx >= this.length || idx < 0) {
         throw new Error('Not a valid index!');
      }
      let currentNode = this.getNode(idx);
      currentNode.val = val;
   }

   /** insertAt(idx, val): add node w/val before idx. */
   insertAt(idx, val) {
      if (idx >= this.length || idx < 0) {
         throw new Error('Not a valid index!');
      }

      if (idx === 0) return this.unshift(val); //inserting at head
      if (idx === this.length) return this.push(val); //inserting at tail

      let newNode = new Node(val);
      let previousNode = this.getNode(idx - 1);
      newNode.next = previousNode.next; //have to first set newNode.next before prevNode.next | if vice versa, creates an infinite loop
      previousNode.next = newNode;

      this.length += 1;
   }

   /** average(): return an average of all values in the list */
   average() {
      let currentNode = this.head;
      let count = 0;
      let total = 0;

      while (count < this.length) {
         total += currentNode.val;
         count += 1;
         currentNode = currentNode.next;
      }
      return total / this.length;
   }
}

// module.exports = LinkedList;

node1 = new Node('first');
node2 = new Node('two');
node3 = new Node('three');

listy = new LinkedList([10, 20, 30, 40, 50]);
