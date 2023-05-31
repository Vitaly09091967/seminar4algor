// Необходимо превратить собранное на семинаре дерево поиска в полноценное 
// левостороннее красно-черное дерево. И реализовать в нем метод добавления 
// новых элементов с балансировкой.

// Красно-черное дерево имеет следующие критерии:
// • Каждая нода имеет цвет (красный или черный)
// • Корень дерева всегда черный
// • Новая нода всегда красная
// • Красные ноды могут быть только левым ребенком
// • У краной ноды все дети черного цвета

// Соответственно, чтобы данные условия выполнялись, после 
//  элемента в дерево необходимо произвести балансировку, благодаря 
//  которой все критерии выше станут валидными. Для балансировки 
//  существует 3 операции – левый малый поворот, правый малый поворот 
//  и смена цвета.


public class RedBlackTree<T extends Comparable<T>> {

    // узел дерева
    public class Node {
        public T value;
        public Node left;
        public Node right;
        public boolean isRed;

        public Node(T value) {
            this.value = value;
            this.isRed = true;
        }
    }

    // рекурсивный метод добавления элемента
    private Node add(Node node, T value) {
        if (node == null) {
            return new Node(value);
        }

        if (value.compareTo(node.value) < 0) {
            node.left = add(node.left, value);
        } else if (value.compareTo(node.value) > 0) {
            node.right = add(node.right, value);
        }

        // балансировка дерева после добавления элемента
        if (isRed(node.right) && !isRed(node.left)) {
            node = rotateLeft(node);
        }
        if (isRed(node.left) && isRed(node.left.left)) {
            node = rotateRight(node);
        }
        if (isRed(node.left) && isRed(node.right)) {
            flipColors(node);
        }

        return node;
    }

    // метод добавления нового элемента
    public void add(T value) {
        root = add(root, value);
        root.isRed = false;
    }

    // метод проверки цвета узла (красный или черный)
    private boolean isRed(Node node) {
        if (node == null) {
            return false;
        }
        return node.isRed;
    }

    // метод левого малого поворота
    private Node rotateLeft(Node node) {
        Node temp = node.right;
        node.right = temp.left;
        temp.left = node;
        temp.isRed = node.isRed;
        node.isRed = true;
        return temp;
    }

    // метод правого малого поворота
    private Node rotateRight(Node node) {
        Node temp = node.left;
        node.left = temp.right;
        temp.right = node;
        temp.isRed = node.isRed;
        node.isRed = true;
        return temp;
    }

    // метод смены цвета узлов
    private void flipColors(Node node) {
        node.left.isRed = !node.left.isRed;
        node.right.isRed = !node.right.isRed;
        node.isRed = !node.isRed;
    }

    private Node root;

    public RedBlackTree() {
        root = null;
    }

}

// Использование данного класса будет выглядеть следующим образом:


RedBlackTree<Integer> tree = new RedBlackTree<>();

tree.add(5);
tree.add(3);
tree.add(7);
tree.add(2);

// вывод элементов в порядке возрастания
tree.inorder(n -> System.out.println(n.value));
