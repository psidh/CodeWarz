export type Problem = {
  problemId: string;
  title: string;
  rating: number;
  Content: React.FC;
};

export const problems: Problem[] = [
  {
    problemId: "A",
    title: "Rocky Bhai",
    rating: 1000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            You're given strings <span className="high">rocks</span>{" "}
            representing the types of stones that are{" "}
            <span className="high">rocks</span>, and stones representing the
            stones you have. Each character in stones is a type of stone you
            have. You want to know how many of the stones you have are also{" "}
            <span className="high">rocks</span>. Letters are case sensitive, so
            "a" is considered a different type of stone from "A".
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>Input contains two lines </p>
          <p>
            - First line contains <span className="high">rocks</span> string
          </p>
          <p>
            - Second line contains <span className="high">stones</span> string
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>Print a single integer</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Constraints</h2>
          <p>{"1 <= rocks.length, stones.length <= 50"}</p>
          <p>
            <span className="high">rocks</span> and{" "}
            <span className="high">stones</span> consist of only English
            letters.
          </p>
          <p>
            All the characters of <span className="high">rocks</span> are
            unique.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>
          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
aA
aAAbbbb

Output
3`}
          </pre>
        </section>
      </div>
    ),
  },

  {
    problemId: "B",
    title: "Trunk It",
    rating: 700,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            A sentence is a list of words that are separated by a single space
            with no leading or trailing spaces. Each of the words consists of
            only uppercase and lowercase English letters (no punctuation). You
            are given a sentence <span className="high">s</span> and an integer
            <span className="high">k</span>. You want to truncate such that it
            contains only the first <span className="high">k</span> words.
            Return <span className="high">s</span> after truncating it.
          </p>
          <p>
            What is the minimum number of operations needed to make all
            characters in the string equal? It is guaranteed that this is always
            possible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first line contains an integer <b>k</b> — the number of words.
          </p>
          <p>
            The second line contains string <b>s</b>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            For each test case, print the minimum number of operations required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Constraints</h2>
          <ul className="list-disc pl-6">
            <li>1 ≤ s ≤ 20</li>
            <li>1 ≤ k ≤ s.length()</li>
            <li>Sum of n over all test cases ≤ 100</li>
          </ul>
        </section>
      </div>
    ),
  },

  {
    problemId: "C",
    title: "Rome aa?",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            A phrase is a <span className="high">palindrome</span> if, after
            converting all uppercase letters into lowercase letters and removing
            all non-alphanumeric characters, it reads the same forward and
            backward. Alphanumeric characters include letters and numbers.
          </p>
          <p>
            Given a string <span className="high">s</span> , return true if it
            is a <span className="high">palindrome</span> , or false otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            One line contains a string <b>s</b>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            For each string given print if it is palindrome print "YES" else
            "NO"
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Constraints</h2>
          <ul className="list-disc pl-6">
            <li>1 ≤ s.length() ≤ 10^4</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
madam


Output
YES
`}
          </pre>
        </section>
      </div>
    ),
  },
  {
    problemId: "D",
    title: "Yummy Watermelon",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            One hot summer day Pete and his friend Billy decided to buy a
            watermelon. They chose the biggest and the ripest one, in their
            opinion. After that the watermelon was weighed, and the scales
            showed <span className="high">w</span> kilos. They rushed home,
            dying of thirst, and decided to divide the berry, however they faced
            a hard problem.
            <br />
            <br />
            Pete and Billy are great fans of even numbers, that's why they want
            to divide the watermelon in such a way that each of the two parts
            weighs even number of kilos, at the same time it is not obligatory
            that the parts are equal. The boys are extremely tired and want to
            start their meal as soon as possible, that's why you should help
            them and find out, if they can divide the watermelon in the way they
            want. For sure, each of them should get a part of positive weight.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first (and the only) input line contains integer number w (1 ≤ {" "}
            <span className="high">w</span>  ≤ 100) — the weight of the
            watermelon bought by the boys.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            Print <span className="high">YES</span>, if the boys can divide the
            watermelon into two parts, each of them weighing even number of
            kilos; and <span className="high">NO</span> in the opposite case.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>
          <h3 className="text-lg my-4 font-semibold text-neutral-400 mb-2">
            Example 1
          </h3>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
8


Output
YES
`}
          </pre>
          <h3 className="text-lg my-4 font-semibold text-neutral-400 mb-2">
            Example 2
          </h3>
          <pre className="bg-black/60 border border-white/20 rounded-lg my-4 p-4 text-sm text-blue-400">
            {`Input
5


Output
NO
`}
          </pre>
        </section>
      </div>
    ),
  },
  {
    problemId: "E",
    title: "Salaar",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            Sometimes some words like{" "}
            <span className="high">"localization"</span> or{" "}
            <span className="high">"internationalization"</span>
            are so long that writing them many times in one text is quite
            tiresome. Let's consider a word too long, if its length is strictly
            more than{" "}
            <span className="high underline underline-offset-4 text-blue-500">
              10 characters
            </span>
            . All too long words should be replaced with a special abbreviation.
            This abbreviation is made like this: we write down the first and the
            last letter of a word and between them we write the number of
            letters between the first and the last letters. That number is in
            decimal system and doesn't contain any leading zeroes. Thus,{" "}
            <span className="high">"localization"</span> will be spelt as{" "}
            <span className="high">"l10n"</span>, and{" "}
            <span className="high">"internationalization"</span> will be spelt
            as
            <span className="high">"i18n"</span>. You are suggested to
            automatize the process of changing the words with abbreviations. At
            that all too long words should be replaced by the abbreviation and
            the words that are not too long should not undergo any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first line contains an integer <span className="high">n</span> (
            {"1 <= n <= 100"}).
            <br /> <br /> Each of the following <span className="high">
              n
            </span>{" "}
            lines contains one word. All the words consist of lowercase Latin
            letters and possess the lengths of from 1 to 100 characters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            Print <span className="high">n</span> lines. The i-th line should
            contain the result of replacing of the i-th word from the input
            data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
4
word
localization

Output
word
l10n
`}
          </pre>
        </section>
      </div>
    ),
  },
  {
    problemId: "F",
    title: "Pushpa",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            You are <span className="high">Pushpa</span> planning to rob{" "}
            <span className="high">sandelwood-factory</span> along Karnataka.
            Each <span className="high">factory</span> has a certain amount of
            wood stashed. All <span className="high">sandelwood-factory</span>{" "}
            at this place are arranged in a circle. That means the first{" "}
            <span className="high">factory</span> is the neighbor of the last
            one. Meanwhile, adjacent{" "}
            <span className="high">sandelwood-factory</span> have a security
            system connected, and it will automatically contact the police if
            two adjacent <span className="high">sandelwood-factory</span> were
            broken into on the same night. Given an integer array nums
            representing the amount of wood of each{" "}
            <span className="high">factory</span>, return the maximum amount of
            wood you can rob tonight without alerting{" "}
            <span className="high">Bhanwar Singh Shekhawat IPS</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first line contains an integer <span className="high">n</span> (
            {"1 <= n <= 100"}). It represents the length of the array.
          </p>
          <p>Second line contains n spaced array elements.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            Print the maximum amount of wood you can rob tonight without
            alerting <span className="high">Bhanwar Singh Shekhawat IPS</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
3
2 3 2

Output
3
`}
          </pre>
        </section>
      </div>
    ),
  },

  {
    problemId: "G",
    title: "Pushpa 2",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            You are Pushpa planning to rob <span className="high">factory</span>{" "}
            along a street. Each <span className="high">factory</span> has a
            certain amount of wood stashed, the only constraint stopping you
            from robbing each of them is that adjacent
            <span className="high">factory</span> have security systems
            connected and it will automatically contact the police if two
            adjacent <span className="high">factory</span> were broken into on
            the same night. Given an integer array nums representing the amount
            of wood of each <span className="high">factory</span>, return the
            maximum amount of wood you can rob tonight without alerting alerting{" "}
            <span className="high">Bhanwar Singh Shekhawat IPS</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first line contains an integer <span className="high">n</span> (
            {"1 <= n <= 100"}). It represents the length of the array.
          </p>
          <p>Second line contains n spaced array elements.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            Print the maximum amount of wood you can rob tonight without
            alerting <span className="high">Bhanwar Singh Shekhawat IPS</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
4
1 2 3 1

Output
4
`}
          </pre>
        </section>
      </div>
    ),
  },
  {
    problemId: "H",
    title: "Water",
    rating: 2000,
    Content: () => (
      <div className="space-y-6 text-white/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Problem Statement
          </h2>
          <p>
            You are given two strings{" "}
            <span className="high">
              The first line contains a string <span>word1</span>
            </span>{" "}
            and <span className="high">word2</span>. Merge the strings by adding
            letters in alternating order, starting with{" "}
            <span className="high">
              The first line contains a string <span>word1</span>
            </span>
            . If a string is longer than the other, append the additional
            letters onto the end of the merged string. Return the merged string.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Input</h2>
          <p>
            The first line contains a string <span>word1</span>
          </p>
          The second line contains a string <span className="high">word2</span>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Output</h2>
          <p>
            Print the maximum amount of wood you can rob tonight without
            alerting <span className="high">Bhanwar Singh Shekhawat IPS</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Example</h2>

          <pre className="bg-black/60 border border-white/20 rounded-lg p-4 text-sm text-blue-400">
            {`Input
abc
pqr

Output
apbqcr
`}
          </pre>
        </section>
      </div>
    ),
  },
];
